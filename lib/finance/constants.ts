export type FinanceResultStatus = "ok" | "warning" | "danger";

export interface FinanceThresholds {
  savingsRateOk: number;
  savingsRateWarning: number;
  dsrOk: number;
  dsrWarning: number;
  emergencyMonthsOk: number;
  emergencyMonthsWarning: number;
  retirementFactorDefault: number;
}

export const FINANCE_THRESHOLDS: FinanceThresholds = {
  savingsRateOk: 0.20,
  savingsRateWarning: 0.10,
  dsrOk: 0.35,
  dsrWarning: 0.50,
  emergencyMonthsOk: 6,
  emergencyMonthsWarning: 3,
  retirementFactorDefault: 25,
};

export const FINANCE_MESSAGES = {
  invalidInput: "Invalid input values were provided.",
  zeroIncome: "Income must be greater than zero to calculate this metric.",
  zeroExpenses: "Expenses must be greater than zero to calculate this metric.",
  zeroMonths: "The number of periods must be greater than zero.",
  zeroEssentialExpenses: "Essential expenses must be greater than zero.",
};
