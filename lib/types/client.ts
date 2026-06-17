/**
 * Client management types and interfaces
 */

export type RiskTolerance = 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
export type RelationshipType = 'SELF' | 'SPOUSE' | 'CHILD' | 'OTHER';

export interface ClientFinancials {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  emergencyFundMonths: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string | null;
  nationality: string | null;
  idNumber: string | null;
  maritalStatus: string | null;
  occupationType: string | null;
  jobTitle: string | null;
  riskTolerance: RiskTolerance | null;
  createdAt: string;
  updatedAt: string;
  financials: ClientFinancials;
  profileCompletion: number; // 0-100
  lastReviewDate: string | null;
  status: 'active' | 'inactive' | 'prospect';
}

export interface ClientListItem extends Client {
  profileCompletion: number;
}

export interface ClientFilters {
  status?: 'active' | 'inactive' | 'prospect';
  riskTolerance?: RiskTolerance;
  minNetWorth?: number;
  maxNetWorth?: number;
  minProfileCompletion?: number;
}

export interface ClientSort {
  field: 'name' | 'createdAt' | 'netWorth' | 'profileCompletion';
  order: 'asc' | 'desc';
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  nationality: string;
  idNumber: string;
  maritalStatus: string;
  occupationType: string;
  jobTitle: string;
  riskTolerance: RiskTolerance;
}
