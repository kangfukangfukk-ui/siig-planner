import { FINANCE_THRESHOLDS, FINANCE_MESSAGES, FinanceResultStatus } from "./constants";

export type FinanceCalculationResult = {
  value: number;
  status: FinanceResultStatus;
  message: string;
};

const isValidNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const createResult = (
  value: number,
  status: FinanceResultStatus,
  message: string,
): FinanceCalculationResult => ({
  value,
  status,
  message,
});

const clampToZero = (value: number): number => (value < 0 ? 0 : value);

const formatPercent = (value: number): number => Number((value * 100).toFixed(2));

const getStatusByThresholds = (
  value: number,
  okThreshold: number,
  warningThreshold: number,
): FinanceResultStatus => {
  if (value <= okThreshold) {
    return "ok";
  }

  if (value <= warningThreshold) {
    return "warning";
  }

  return "danger";
};

/**
 * Calculate net worth as total assets minus total liabilities.
 */
export const calcNetWorth = (
  totalAssets: number,
  totalLiabilities: number,
): FinanceCalculationResult => {
  if (!isValidNumber(totalAssets) || !isValidNumber(totalLiabilities)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  const value = Number((totalAssets - totalLiabilities).toFixed(2));
  const status = value < 0 ? "danger" : "ok";
  const message =
    value < 0
      ? "Net worth is negative. Review assets and liabilities."
      : "Net worth is healthy based on current balances.";

  return createResult(value, status, message);
};

/**
 * Calculate savings rate as a percentage of income.
 */
export const calcSavingsRate = (
  monthlyIncome: number,
  monthlyExpenses: number,
): FinanceCalculationResult => {
  if (!isValidNumber(monthlyIncome) || !isValidNumber(monthlyExpenses)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (monthlyIncome <= 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.zeroIncome);
  }

  const monthlySavings = monthlyIncome - monthlyExpenses;
  const rawRate = monthlySavings / monthlyIncome;
  const value = formatPercent(rawRate);
  const status = rawRate >= FINANCE_THRESHOLDS.savingsRateOk ? "ok" : rawRate >= FINANCE_THRESHOLDS.savingsRateWarning ? "warning" : "danger";
  const message =
    rawRate >= FINANCE_THRESHOLDS.savingsRateOk
      ? "Savings rate is strong."
      : rawRate >= FINANCE_THRESHOLDS.savingsRateWarning
      ? "Savings rate is acceptable but can improve."
      : "Savings rate is low; prioritize increasing savings or lowering expenses.";

  return createResult(value, status, message);
};

/**
 * Calculate debt service ratio (DSR) as percentage of income used for debt payments.
 */
export const calcDSR = (
  totalMonthlyDebtPayments: number,
  monthlyIncome: number,
): FinanceCalculationResult => {
  if (!isValidNumber(totalMonthlyDebtPayments) || !isValidNumber(monthlyIncome)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (monthlyIncome <= 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.zeroIncome);
  }

  const ratio = totalMonthlyDebtPayments / monthlyIncome;
  const value = formatPercent(ratio);
  const status = getStatusByThresholds(ratio, FINANCE_THRESHOLDS.dsrOk, FINANCE_THRESHOLDS.dsrWarning);
  const message =
    status === "ok"
      ? "Debt load is manageable relative to income."
      : status === "warning"
      ? "Debt payments are rising; monitor monthly obligations closely."
      : "Debt payments are high; consider refinancing or reducing debt.";

  return createResult(value, status, message);
};

/**
 * Calculate how many months the emergency fund covers.
 */
export const calcEmergencyFundRatio = (
  monthlyEssentialExpenses: number,
  currentEmergencySavings: number,
): FinanceCalculationResult => {
  if (!isValidNumber(monthlyEssentialExpenses) || !isValidNumber(currentEmergencySavings)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (monthlyEssentialExpenses <= 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.zeroEssentialExpenses);
  }

  const coverageMonths = Number((currentEmergencySavings / monthlyEssentialExpenses).toFixed(2));
  const status =
    coverageMonths >= FINANCE_THRESHOLDS.emergencyMonthsOk
      ? "ok"
      : coverageMonths >= FINANCE_THRESHOLDS.emergencyMonthsWarning
      ? "warning"
      : "danger";
  const message =
    status === "ok"
      ? `Emergency savings cover ${coverageMonths} months, which is in a healthy range.`
      : status === "warning"
      ? `Emergency savings cover ${coverageMonths} months; consider increasing reserves to at least ${FINANCE_THRESHOLDS.emergencyMonthsOk} months.`
      : `Emergency savings cover only ${coverageMonths} months. Increase savings or reduce essential expenses.`;

  return createResult(coverageMonths, status, message);
};

/**
 * Calculate future value of current savings with periodic compound growth.
 */
export const calcGoalFV = (
  presentValue: number,
  annualRate: number,
  years: number,
): FinanceCalculationResult => {
  if (!isValidNumber(presentValue) || !isValidNumber(annualRate) || !isValidNumber(years)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (years < 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.zeroMonths);
  }

  const compoundFactor = Math.pow(1 + annualRate, years);
  const value = Number((presentValue * compoundFactor).toFixed(2));
  const status = value >= presentValue ? "ok" : "warning";
  const message =
    years === 0
      ? "No growth period specified; future value equals current balance."
      : annualRate >= 0
      ? "Future value estimate calculated with compound growth."
      : "Negative growth rate was used; future value may decline.";

  return createResult(value, status, message);
};

/**
 * Calculate required monthly payment to reach a future target amount.
 */
export const calcGoalPMT = (
  futureValue: number,
  presentValue: number,
  annualRate: number,
  months: number,
): FinanceCalculationResult => {
  if (
    !isValidNumber(futureValue) ||
    !isValidNumber(presentValue) ||
    !isValidNumber(annualRate) ||
    !isValidNumber(months)
  ) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (months <= 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.zeroMonths);
  }

  const monthlyRate = annualRate / 12;
  const futureBalance = futureValue - presentValue * Math.pow(1 + monthlyRate, months);

  if (monthlyRate === 0) {
    const value = Number((futureBalance / months).toFixed(2));
    const status = value <= 0 ? "ok" : "warning";
    const message =
      value <= 0
        ? "No additional contributions are required to meet this goal."
        : "Flat-rate savings required to reach the target. " +
          "Consider improving returns or allocating more capital.";

    return createResult(value, status, message);
  }

  const denominator = Math.pow(1 + monthlyRate, months) - 1;

  if (denominator === 0) {
    return createResult(0, "danger", "Calculation cannot proceed due to a zero compound denominator.");
  }

  const value = Number(((futureBalance * monthlyRate) / denominator).toFixed(2));
  const status = value <= 0 ? "ok" : "warning";
  const message =
    value <= 0
      ? "Existing savings are sufficient to reach the future goal."
      : "Monthly contribution required to achieve the goal under current assumptions.";

  return createResult(value, status, message);
};

/**
 * Calculate the funding gap between a target amount and current savings.
 */
export const calcFundingGap = (
  targetAmount: number,
  currentAmount: number,
): FinanceCalculationResult => {
  if (!isValidNumber(targetAmount) || !isValidNumber(currentAmount)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  const gap = clampToZero(targetAmount - currentAmount);
  const status = gap === 0 ? "ok" : "warning";
  const message =
    gap === 0
      ? "Funding target has been met."
      : "Additional funding is required to close the gap to the target.";

  return createResult(Number(gap.toFixed(2)), status, message);
};

/**
 * Calculate a retirement nest egg using an annual withdrawal factor.
 */
export const calcRetirementNestEgg = (
  annualRetirementIncome: number,
  withdrawalFactor = FINANCE_THRESHOLDS.retirementFactorDefault,
): FinanceCalculationResult => {
  if (!isValidNumber(annualRetirementIncome) || !isValidNumber(withdrawalFactor)) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (annualRetirementIncome <= 0 || withdrawalFactor <= 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  const value = Number((annualRetirementIncome * withdrawalFactor).toFixed(2));
  const status = withdrawalFactor >= FINANCE_THRESHOLDS.retirementFactorDefault ? "ok" : "warning";
  const message =
    status === "ok"
      ? "Retirement nest egg estimate uses a conservative withdrawal factor."
      : "Consider a higher withdrawal factor or additional savings to improve retirement readiness.";

  return createResult(value, status, message);
};

/**
 * Calculate life insurance need based on liabilities, income replacement, education, and reserves.
 */
export const calcLifeInsuranceNeed = (
  outstandingDebt: number,
  futureIncomeNeed: number,
  educationCost: number,
  emergencyReserve: number,
  existingCoverage: number,
): FinanceCalculationResult => {
  if (
    !isValidNumber(outstandingDebt) ||
    !isValidNumber(futureIncomeNeed) ||
    !isValidNumber(educationCost) ||
    !isValidNumber(emergencyReserve) ||
    !isValidNumber(existingCoverage)
  ) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  const grossNeed = outstandingDebt + futureIncomeNeed + educationCost + emergencyReserve;
  const value = clampToZero(Number((grossNeed - existingCoverage).toFixed(2)));
  const status = value === 0 ? "ok" : "warning";
  const message =
    value === 0
      ? "Existing coverage is sufficient for the current life insurance need estimate."
      : "Additional life insurance coverage may be required to meet protection goals.";

  return createResult(value, status, message);
};

/**
 * Calculate critical illness insurance need using income replacement and direct costs.
 */
export const calcCIInsuranceNeed = (
  currentIncome: number,
  coverageYears: number,
  lumpSumCost: number,
  existingCoverage: number,
): FinanceCalculationResult => {
  if (
    !isValidNumber(currentIncome) ||
    !isValidNumber(coverageYears) ||
    !isValidNumber(lumpSumCost) ||
    !isValidNumber(existingCoverage)
  ) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  if (coverageYears < 0) {
    return createResult(0, "danger", FINANCE_MESSAGES.invalidInput);
  }

  const replacementNeed = currentIncome * coverageYears;
  const grossNeed = replacementNeed + lumpSumCost;
  const value = clampToZero(Number((grossNeed - existingCoverage).toFixed(2)));
  const status = value === 0 ? "ok" : "warning";
  const message =
    value === 0
      ? "Existing protection covers the estimated critical illness need."
      : "Critical illness coverage may be insufficient based on current income and costs.";

  return createResult(value, status, message);
};
