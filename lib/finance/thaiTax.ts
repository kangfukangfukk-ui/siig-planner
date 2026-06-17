import {
  ThaiTaxBracket,
  ThaiTaxDeductions,
  ThaiTaxResult,
  THAI_TAX_BRACKETS,
  THAI_TAX_CONSTANTS,
  THAI_TAX_MESSAGES,
} from "./thaiTaxConstants";

const isValidNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

const clampToZero = (value: number): number => (value < 0 ? 0 : value);

const roundToNearest = (value: number, decimals = 2): number => {
  return Number(value.toFixed(decimals));
};

/**
 * Calculate cumulative tax on taxable income using progressive tax brackets.
 */
const calculateProgressiveTax = (taxableIncome: number): number => {
  if (taxableIncome <= 0) {
    return 0;
  }

  let tax = 0;

  for (const bracket of THAI_TAX_BRACKETS) {
    if (taxableIncome <= bracket.min) {
      break;
    }

    const incomeInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += incomeInBracket * bracket.rate;
  }

  return roundToNearest(tax);
};

/**
 * Calculate the capacity for retirement deductions (SSF + RMF combined).
 */
export const calculateRetirementDeductionCapacity = (
  grossIncome: number,
): { capacity: number; ssfCapacity: number; rmfCapacity: number; message: string } => {
  if (!isValidNumber(grossIncome)) {
    return {
      capacity: 0,
      ssfCapacity: 0,
      rmfCapacity: 0,
      message: THAI_TAX_MESSAGES.invalidIncome,
    };
  }

  const retirementLimit = Math.min(
    grossIncome * THAI_TAX_CONSTANTS.retirementDeductionPercentage,
    THAI_TAX_CONSTANTS.retirementDeductionLimit,
  );

  const ssfCapacity = Math.min(
    grossIncome * THAI_TAX_CONSTANTS.ssfMaxPercentage,
    THAI_TAX_CONSTANTS.ssfMaxDeduction,
  );

  const rmfCapacity = Math.min(
    grossIncome * THAI_TAX_CONSTANTS.rmfMaxPercentage,
    THAI_TAX_CONSTANTS.rmfMaxDeduction,
  );

  return {
    capacity: roundToNearest(retirementLimit),
    ssfCapacity: roundToNearest(ssfCapacity),
    rmfCapacity: roundToNearest(rmfCapacity),
    message: `Available capacity: ${roundToNearest(retirementLimit)} THB (SSF max: ${roundToNearest(ssfCapacity)}, RMF max: ${roundToNearest(rmfCapacity)})`,
  };
};

/**
 * Calculate Thai income tax with deductions and allowances.
 */
export const calculateThaiTax = (
  grossIncome: number,
  deductions: Partial<ThaiTaxDeductions> = {},
  dependents: { spouse: boolean; children: number } = { spouse: false, children: 0 },
): ThaiTaxResult => {
  // Validate inputs
  if (!isValidNumber(grossIncome)) {
    return {
      grossIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      tax: 0,
      effectiveRate: 0,
    };
  }

  if (
    !isValidNumber(dependents.children) ||
    dependents.children < 0 ||
    !Number.isInteger(dependents.children)
  ) {
    dependents = { spouse: false, children: 0 };
  }

  // Initialize deductions
  const deductionValues: ThaiTaxDeductions = {
    personalAllowance: THAI_TAX_CONSTANTS.personalAllowance,
    spouseAllowance: dependents.spouse ? THAI_TAX_CONSTANTS.spouseAllowance : 0,
    childAllowance: dependents.children * THAI_TAX_CONSTANTS.childAllowancePerChild,
    ssfContribution: clampToZero(deductions.ssfContribution ?? 0),
    rmfContribution: clampToZero(deductions.rmfContribution ?? 0),
    esgContribution: clampToZero(deductions.esgContribution ?? 0),
    esgxContribution: clampToZero(deductions.esgxContribution ?? 0),
    pensionInsurance: clampToZero(deductions.pensionInsurance ?? 0),
    otherDeductions: clampToZero(deductions.otherDeductions ?? 0),
  };

  // Cap SSF deduction
  const maxSsfDeduction = Math.min(
    THAI_TAX_CONSTANTS.ssfMaxDeduction,
    grossIncome * THAI_TAX_CONSTANTS.ssfMaxPercentage,
  );
  deductionValues.ssfContribution = Math.min(deductionValues.ssfContribution, maxSsfDeduction);

  // Cap RMF deduction
  const maxRmfDeduction = Math.min(
    THAI_TAX_CONSTANTS.rmfMaxDeduction,
    grossIncome * THAI_TAX_CONSTANTS.rmfMaxPercentage,
  );
  deductionValues.rmfContribution = Math.min(deductionValues.rmfContribution, maxRmfDeduction);

  // Enforce SSF + RMF combined limit
  const retirementCombined =
    deductionValues.ssfContribution + deductionValues.rmfContribution;
  if (retirementCombined > THAI_TAX_CONSTANTS.ssfAndRmfCombinedLimit) {
    const overage = retirementCombined - THAI_TAX_CONSTANTS.ssfAndRmfCombinedLimit;
    // Reduce RMF first, then SSF
    const rmfReduction = Math.min(deductionValues.rmfContribution, overage);
    deductionValues.rmfContribution -= rmfReduction;
    const rmfRemaining = overage - rmfReduction;
    if (rmfRemaining > 0) {
      deductionValues.ssfContribution -= Math.min(deductionValues.ssfContribution, rmfRemaining);
    }
  }

  // Cap pension insurance deduction
  deductionValues.pensionInsurance = Math.min(
    deductionValues.pensionInsurance,
    THAI_TAX_CONSTANTS.pensionInsuranceMaxDeduction,
  );

  // Calculate total deductions
  const totalDeductions = roundToNearest(
    deductionValues.personalAllowance +
      deductionValues.spouseAllowance +
      deductionValues.childAllowance +
      deductionValues.ssfContribution +
      deductionValues.rmfContribution +
      deductionValues.esgContribution +
      deductionValues.esgxContribution +
      deductionValues.pensionInsurance +
      deductionValues.otherDeductions,
  );

  // Calculate taxable income
  const taxableIncome = roundToNearest(Math.max(0, grossIncome - totalDeductions));

  // Calculate tax
  const tax = calculateProgressiveTax(taxableIncome);

  // Calculate effective tax rate
  const effectiveRate = grossIncome > 0 ? roundToNearest((tax / grossIncome) * 100) : 0;

  return {
    grossIncome: roundToNearest(grossIncome),
    totalDeductions,
    taxableIncome,
    tax,
    effectiveRate,
  };
};

/**
 * Calculate the effective tax rate given gross income and tax amount.
 */
export const calculateEffectiveTaxRate = (
  grossIncome: number,
  taxAmount: number,
): { effectiveRate: number; marginalRate: number; message: string } => {
  if (!isValidNumber(grossIncome)) {
    return {
      effectiveRate: 0,
      marginalRate: 0,
      message: THAI_TAX_MESSAGES.invalidIncome,
    };
  }

  if (!isValidNumber(taxAmount)) {
    return {
      effectiveRate: 0,
      marginalRate: 0,
      message: "Tax amount must be a valid non-negative number.",
    };
  }

  const effectiveRate = grossIncome > 0 ? roundToNearest((taxAmount / grossIncome) * 100) : 0;

  // Calculate marginal tax rate based on income level
  let marginalRate = 0;
  for (const bracket of THAI_TAX_BRACKETS) {
    if (grossIncome > bracket.min && grossIncome <= bracket.max) {
      marginalRate = roundToNearest(bracket.rate * 100);
      break;
    }
  }

  const message =
    grossIncome === 0
      ? "Income is zero; no tax calculation possible."
      : `Effective rate: ${effectiveRate}%, Marginal rate: ${marginalRate}%`;

  return {
    effectiveRate,
    marginalRate,
    message,
  };
};
