import { z } from 'zod';

// Thai localization messages
const thaiMessages = {
  required: 'กรุณากรอกข้อมูล',
  invalidEmail: 'อีเมลไม่ถูกต้อง',
  invalidPhone: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
  invalidDate: 'วันที่ไม่ถูกต้อง',
  numberError: 'กรุณากรอกตัวเลข',
  positiveNumber: 'กรุณากรอกตัวเลขบวก',
};

// Shared field validations
const commonFields = {
  email: z.string().email(thaiMessages.invalidEmail),
  phone: z.string().regex(/^[0-9]{10}$/, thaiMessages.invalidPhone).optional().or(z.literal('')),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), thaiMessages.invalidDate),
  positiveDecimal: z.coerce.number().positive(thaiMessages.positiveNumber),
  nonNegativeDecimal: z.coerce.number().nonnegative('ต้องไม่เป็นลบ'),
};

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, thaiMessages.required),
  lastName: z.string().min(1, thaiMessages.required),
  email: commonFields.email,
  phone: commonFields.phone,
  birthDate: z.string().min(1, thaiMessages.required),
  nationality: z.string().min(1, 'กรุณาเลือกสัญชาติ'),
  idNumber: z.string().min(1, 'กรุณากรอกเลขบัตรประชาชน'),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    message: 'กรุณาเลือกสถานภาพ',
  }),
});

// Step 2: Family Information
export const familyInfoSchema = z.object({
  spouseName: z.string().optional(),
  spouseEmail: commonFields.email.optional().or(z.literal('')),
  dependents: z.coerce.number().nonnegative('จำนวนผู้อาศัยอยู่ต้องไม่เป็นลบ').optional(),
  childrenCount: z.coerce.number().nonnegative('จำนวนบุตรต้องไม่เป็นลบ').optional(),
  childrenAges: z.string().optional(),
  supportingFamily: z.boolean().optional(),
  familyNotes: z.string().optional(),
});

// Step 3: Career
export const careerSchema = z.object({
  occupationType: z.enum(['employee', 'self_employed', 'business_owner', 'retired', 'student', 'other'], {
    message: 'กรุณาเลือกประเภทงาน',
  }),
  industry: z.string().min(1, 'กรุณากรอกประเภทอุตสาหกรรม'),
  jobTitle: z.string().min(1, 'กรุณากรอกตำแหน่งงาน'),
  yearsInJob: z.coerce.number().nonnegative('ต้องไม่เป็นลบ'),
  employerName: z.string().optional(),
  workPhone: commonFields.phone,
  yearsToRetirement: z.coerce.number().nonnegative('ต้องไม่เป็นลบ').optional(),
  expectedRetirementAge: z.coerce.number().positive('อายุเกษียณต้องเป็นบวก').optional(),
});

// Step 4: Income
export const incomeSchema = z.object({
  monthlySalary: commonFields.nonNegativeDecimal,
  bonusAnnual: commonFields.nonNegativeDecimal.optional(),
  otherIncomeMonthly: commonFields.nonNegativeDecimal.optional(),
  otherIncomeDescription: z.string().optional(),
  spouseMonthlyIncome: commonFields.nonNegativeDecimal.optional(),
  investmentIncome: commonFields.nonNegativeDecimal.optional(),
  rentalIncome: commonFields.nonNegativeDecimal.optional(),
  incomeFrequency: z.enum(['monthly', 'quarterly', 'annually'], {
    message: 'กรุณาเลือกความถี่ของรายได้',
  }),
  incomeStability: z.enum(['stable', 'variable', 'seasonal'], {
    message: 'กรุณาเลือกความมั่นคงของรายได้',
  }),
});

// Step 5: Expenses
export const expensesSchema = z.object({
  housingExpense: commonFields.nonNegativeDecimal,
  utilities: commonFields.nonNegativeDecimal.optional(),
  groceries: commonFields.nonNegativeDecimal.optional(),
  transportation: commonFields.nonNegativeDecimal.optional(),
  childcare: commonFields.nonNegativeDecimal.optional(),
  education: commonFields.nonNegativeDecimal.optional(),
  healthcare: commonFields.nonNegativeDecimal.optional(),
  insurance: commonFields.nonNegativeDecimal.optional(),
  entertainment: commonFields.nonNegativeDecimal.optional(),
  otherExpenses: commonFields.nonNegativeDecimal.optional(),
  expensePeriod: z.enum(['monthly', 'annually'], {
    message: 'กรุณาเลือกระยะเวลา',
  }),
});

// Step 6: Assets
export const assetsSchema = z.object({
  assets: z.array(
    z.object({
      type: z.enum(['cash', 'savings', 'investment', 'property', 'vehicle', 'other'], {
        message: 'กรุณาเลือกประเภทสินทรัพย์',
      }),
      name: z.string().min(1, thaiMessages.required),
      value: commonFields.positiveDecimal,
      description: z.string().optional(),
    })
  ).min(1, 'กรุณาเพิ่มสินทรัพย์อย่างน้อย 1 รายการ'),
});

// Step 7: Liabilities
export const liabilitiesSchema = z.object({
  liabilities: z.array(
    z.object({
      type: z.enum(['mortgage', 'personal_loan', 'credit_card', 'car_loan', 'other'], {
        message: 'กรุณาเลือกประเภทหนี้',
      }),
      name: z.string().min(1, thaiMessages.required),
      balance: commonFields.nonNegativeDecimal,
      interestRate: z.coerce.number().nonnegative('ต้องไม่เป็นลบ').optional(),
      monthlyPayment: commonFields.nonNegativeDecimal.optional(),
      maturityDate: z.string().optional(),
      description: z.string().optional(),
    })
  ).optional(),
});

// Step 8: Insurance
export const insuranceSchema = z.object({
  hasLifeInsurance: z.boolean(),
  lifeInsuranceCoverage: commonFields.nonNegativeDecimal.optional(),
  hasHealthInsurance: z.boolean(),
  healthInsuranceType: z.string().optional(),
  hasDisabilityInsurance: z.boolean(),
  hasPropertyInsurance: z.boolean(),
  hasCriticalIllness: z.boolean(),
  insuranceNotes: z.string().optional(),
  desiredLifeCoverage: commonFields.nonNegativeDecimal.optional(),
  desiredHealthCoverage: commonFields.nonNegativeDecimal.optional(),
});

// Step 9: Investments
export const investmentsSchema = z.object({
  hasInvestments: z.boolean(),
  investmentTypes: z.array(z.string()).optional(),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive'], {
    message: 'กรุณาเลือกความโน้มเอียงต่อความเสี่ยง',
  }),
  investmentKnowledge: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'กรุณาเลือกระดับความรู้',
  }),
  investmentTimeHorizon: z.enum(['short_term', 'medium_term', 'long_term'], {
    message: 'กรุณาเลือกระยะเวลา',
  }),
  investmentGoals: z.string().optional(),
  currentPortfolioValue: commonFields.nonNegativeDecimal.optional(),
});

// Step 10: Goals
export const goalsSchema = z.object({
  goals: z.array(
    z.object({
      goalType: z.enum(['education', 'retirement', 'purchase', 'emergency', 'other'], {
        message: 'กรุณาเลือกประเภทเป้าหมาย',
      }),
      description: z.string().min(1, thaiMessages.required),
      targetAmount: commonFields.positiveDecimal,
      targetDate: z.string().min(1, thaiMessages.required),
      priority: z.enum(['high', 'medium', 'low'], {
        message: 'กรุณาเลือกลำดับความสำคัญ',
      }),
    })
  ).min(1, 'กรุณาเพิ่มเป้าหมายอย่างน้อย 1 รายการ'),
});

// Combined schema for all steps
export const factFindFormSchema = z.object({
  personalInfo: personalInfoSchema,
  familyInfo: familyInfoSchema,
  career: careerSchema,
  income: incomeSchema,
  expenses: expensesSchema,
  assets: assetsSchema,
  liabilities: liabilitiesSchema,
  insurance: insuranceSchema,
  investments: investmentsSchema,
  goals: goalsSchema,
});

export type FactFindFormData = z.infer<typeof factFindFormSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type FamilyInfoData = z.infer<typeof familyInfoSchema>;
export type CareerData = z.infer<typeof careerSchema>;
export type IncomeData = z.infer<typeof incomeSchema>;
export type ExpensesData = z.infer<typeof expensesSchema>;
export type AssetsData = z.infer<typeof assetsSchema>;
export type LiabilitiesData = z.infer<typeof liabilitiesSchema>;
export type InsuranceData = z.infer<typeof insuranceSchema>;
export type InvestmentsData = z.infer<typeof investmentsSchema>;
export type GoalsData = z.infer<typeof goalsSchema>;
