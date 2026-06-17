export interface ThaiTaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface ThaiTaxDeductions {
  personalAllowance: number;
  spouseAllowance: number;
  childAllowance: number;
  ssfContribution: number;
  rmfContribution: number;
  esgContribution: number;
  esgxContribution: number;
  pensionInsurance: number;
  otherDeductions: number;
}

export interface ThaiTaxResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  tax: number;
  effectiveRate: number;
}

export const THAI_TAX_BRACKETS: ThaiTaxBracket[] = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 300000, rate: 0.05 },
  { min: 300001, max: 500000, rate: 0.1 },
  { min: 500001, max: 750000, rate: 0.15 },
  { min: 750001, max: 1000000, rate: 0.2 },
  { min: 1000001, max: 2000000, rate: 0.25 },
  { min: 2000001, max: 5000000, rate: 0.3 },
  { min: 5000001, max: Infinity, rate: 0.35 },
];

export const THAI_TAX_CONSTANTS = {
  personalAllowance: 60000,
  spouseAllowance: 60000,
  childAllowancePerChild: 15000,
  ssfMaxDeduction: 200000,
  ssfMaxPercentage: 0.3,
  rmfMaxDeduction: 500000,
  rmfMaxPercentage: 0.3,
  ssfAndRmfCombinedLimit: 500000,
  retirementDeductionLimit: 500000,
  retirementDeductionPercentage: 0.15,
  pensionInsuranceMaxDeduction: 300000,
};

export const THAI_TAX_MESSAGES = {
  invalidIncome: "Income must be a valid positive number.",
  invalidDeductions: "Deductions must be non-negative numbers.",
  invalidDependents: "Number of dependents must be non-negative.",
  ssfExceedsLimit: "SSF contribution exceeds the maximum deductible limit.",
  rmfExceedsLimit: "RMF contribution exceeds the maximum deductible limit.",
  combinedRetirementExceedsLimit: "Combined SSF and RMF deduction exceeds 500,000 THB limit.",
};
