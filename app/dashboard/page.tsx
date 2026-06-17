"use client";

import React from "react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { NetWorthTrendChart } from "@/components/dashboard/NetWorthTrendChart";
import { MonthlyCashFlowChart } from "@/components/dashboard/MonthlyCashFlowChart";
import { AssetAllocationChart } from "@/components/dashboard/AssetAllocationChart";
import { GoalProgressSection } from "@/components/dashboard/GoalProgressSection";
import {
  calcNetWorth,
  calcSavingsRate,
  calcDSR,
  calcEmergencyFundRatio,
} from "@/lib/finance/calculators";

/**
 * Mock financial data for demonstration.
 * In production, this would be fetched from the database based on the logged-in user.
 */
const MOCK_FINANCIAL_DATA = {
  assets: {
    cash: 250000,
    investment: 800000,
    property: 2000000,
    vehicle: 350000,
  },
  liabilities: {
    mortgage: 1200000,
    carLoan: 250000,
    creditCard: 45000,
  },
  income: {
    monthly: 120000,
  },
  expenses: {
    monthly: 85000,
  },
  emergency: {
    essentialExpenses: 45000,
    currentSavings: 270000,
  },
};

/**
 * Net Worth Trend Data (12 months)
 */
const NET_WORTH_TREND_DATA = [
  { month: "ม.ค.", netWorth: 1250000, assets: 3200000, liabilities: 1950000 },
  { month: "ก.พ.", netWorth: 1285000, assets: 3220000, liabilities: 1935000 },
  { month: "มี.ค.", netWorth: 1330000, assets: 3250000, liabilities: 1920000 },
  { month: "เม.ย.", netWorth: 1375000, assets: 3280000, liabilities: 1905000 },
  { month: "พ.ค.", netWorth: 1420000, assets: 3320000, liabilities: 1900000 },
  { month: "มิ.ย.", netWorth: 1455000, assets: 3350000, liabilities: 1895000 },
  { month: "ก.ค.", netWorth: 1500000, assets: 3400000, liabilities: 1900000 },
  { month: "ส.ค.", netWorth: 1545000, assets: 3450000, liabilities: 1905000 },
  { month: "ก.ย.", netWorth: 1590000, assets: 3500000, liabilities: 1910000 },
  { month: "ต.ค.", netWorth: 1635000, assets: 3550000, liabilities: 1915000 },
  { month: "พ.ย.", netWorth: 1680000, assets: 3600000, liabilities: 1920000 },
  { month: "ธ.ค.", netWorth: 1725000, assets: 3650000, liabilities: 1925000 },
];

/**
 * Monthly Cash Flow Data (6 months)
 */
const MONTHLY_CASH_FLOW_DATA = [
  { month: "ก.ค.", income: 120000, expenses: 85000, savings: 35000 },
  { month: "ส.ค.", income: 135000, expenses: 88000, savings: 47000 },
  { month: "ก.ย.", income: 120000, expenses: 82000, savings: 38000 },
  { month: "ต.ค.", income: 120000, expenses: 90000, savings: 30000 },
  { month: "พ.ย.", income: 125000, expenses: 85000, savings: 40000 },
  { month: "ธ.ค.", income: 140000, expenses: 95000, savings: 45000 },
];

/**
 * Asset Allocation Data
 */
const ASSET_ALLOCATION_DATA = [
  { name: "Real Estate", value: 2000000, color: "#3b82f6" },
  { name: "Investments", value: 800000, color: "#10b981" },
  { name: "Vehicles", value: 350000, color: "#f59e0b" },
  { name: "Cash & Savings", value: 250000, color: "#8b5cf6" },
];

/**
 * Financial Goals Data
 */
const FINANCIAL_GOALS_DATA = [
  {
    id: "1",
    name: "บ้านฝายเดียว",
    targetAmount: 3000000,
    currentAmount: 1500000,
    targetDate: "2027-12-31",
    priority: "high" as const,
    icon: "🏠",
  },
  {
    id: "2",
    name: "การศึกษาบุตร",
    targetAmount: 2000000,
    currentAmount: 800000,
    targetDate: "2028-06-30",
    priority: "high" as const,
    icon: "🎓",
  },
  {
    id: "3",
    name: "เกษียณอายุ",
    targetAmount: 5000000,
    currentAmount: 2200000,
    targetDate: "2034-12-31",
    priority: "high" as const,
    icon: "🌅",
  },
  {
    id: "4",
    name: "วันหยุดต่างประเทศ",
    targetAmount: 500000,
    currentAmount: 250000,
    targetDate: "2025-06-30",
    priority: "medium" as const,
    icon: "✈️",
  },
  {
    id: "5",
    name: "รถยนต์ใหม่",
    targetAmount: 1200000,
    currentAmount: 600000,
    targetDate: "2026-12-31",
    priority: "medium" as const,
    icon: "🚗",
  },
];

export default function DashboardPage() {
  // Calculate total assets and liabilities
  const totalAssets = Object.values(MOCK_FINANCIAL_DATA.assets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(MOCK_FINANCIAL_DATA.liabilities).reduce((a, b) => a + b, 0);

  // Calculate KPIs
  const netWorth = calcNetWorth(totalAssets, totalLiabilities);
  const savingsRate = calcSavingsRate(
    MOCK_FINANCIAL_DATA.income.monthly,
    MOCK_FINANCIAL_DATA.expenses.monthly,
  );
  const dsr = calcDSR(
    (MOCK_FINANCIAL_DATA.liabilities.mortgage +
      MOCK_FINANCIAL_DATA.liabilities.carLoan +
      MOCK_FINANCIAL_DATA.liabilities.creditCard) /
      12, // Monthly debt payments
    MOCK_FINANCIAL_DATA.income.monthly,
  );
  const emergencyFund = calcEmergencyFundRatio(
    MOCK_FINANCIAL_DATA.emergency.essentialExpenses,
    MOCK_FINANCIAL_DATA.emergency.currentSavings,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Financial Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Comprehensive overview of your wealth and financial goals
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Net Worth Card */}
        <KpiCard
          title="Net Worth"
          value={netWorth.value}
          unit="THB"
          status={netWorth.status}
          message={netWorth.message}
          icon="💰"
        />

        {/* Savings Rate Card */}
        <KpiCard
          title="Savings Rate"
          value={savingsRate.value}
          unit="%"
          status={savingsRate.status}
          message={savingsRate.message}
          icon="📈"
        />

        {/* DSR Card */}
        <KpiCard
          title="Debt Service Ratio"
          value={dsr.value}
          unit="%"
          status={dsr.status}
          message={dsr.message}
          icon="💳"
        />

        {/* Emergency Fund Card */}
        <KpiCard
          title="Emergency Fund"
          value={emergencyFund.value}
          unit="months"
          status={emergencyFund.status}
          message={emergencyFund.message}
          icon="🛡️"
        />
      </div>

      {/* Charts Section */}
      <div className="space-y-8">
        {/* Net Worth Trend Chart */}
        <div>
          <NetWorthTrendChart data={NET_WORTH_TREND_DATA} />
        </div>

        {/* Cash Flow and Asset Allocation */}
        <div className="grid gap-8 lg:grid-cols-2">
          <MonthlyCashFlowChart data={MONTHLY_CASH_FLOW_DATA} />
          <AssetAllocationChart data={ASSET_ALLOCATION_DATA} />
        </div>

        {/* Goals Progress Section */}
        <div>
          <GoalProgressSection goals={FINANCIAL_GOALS_DATA} title="Financial Goals Progress" />
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Financial Summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Assets</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                notation: "compact",
              }).format(totalAssets)}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Liabilities</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                notation: "compact",
              }).format(totalLiabilities)}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Monthly Income</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                notation: "compact",
              }).format(MOCK_FINANCIAL_DATA.income.monthly)}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Monthly Expenses</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                notation: "compact",
              }).format(MOCK_FINANCIAL_DATA.expenses.monthly)}
            </p>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs text-blue-800 md:text-sm">
          <strong>Note:</strong> This dashboard uses mock data for demonstration. In production,
          real financial data will be fetched from your profile and updated automatically.
        </p>
      </div>
    </div>
  );
}
