'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_CLIENTS, getClientById } from '@/lib/data/mockClients';
import { ClientDetailView } from '@/components/clients/ClientDetailView';
import { StatusBadge, RiskToleranceBadge } from '@/components/clients/StatusBadge';

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;
  const client = getClientById(MOCK_CLIENTS, clientId);
  const [isEditMode, setIsEditMode] = useState(false);

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/clients"
            className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block"
          >
            ← กลับ
          </Link>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">ไม่พบลูกค้า</p>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      notation: 'standard',
    }).format(value);
  };

  const netWorthTrend = [
    { percentage: (client.financials.netWorth / 6000000) * 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/clients"
          className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block"
        >
          ← กลับไปยังรายชื่อลูกค้า
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
              <p className="text-gray-600 mt-1">{client.jobTitle}</p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={client.status} />
              {client.riskTolerance && (
                <RiskToleranceBadge riskTolerance={client.riskTolerance} />
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Worth</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(client.financials.netWorth)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(client.financials.monthlyIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {client.financials.savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 transition-all duration-500"
              style={{ width: `${client.profileCompletion}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {client.profileCompletion}% ของข้อมูลถูกกรอกแล้ว
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สินทรัพย์</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Total Assets</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(client.financials.totalAssets)}
                </span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">Distribution</p>
                <div className="flex gap-1">
                  <div className="flex-1 h-2 bg-blue-500 rounded-full" style={{ width: '60%' }} />
                  <div className="flex-1 h-2 bg-green-500 rounded-full" style={{ width: '30%' }} />
                  <div className="flex-1 h-2 bg-orange-500 rounded-full" style={{ width: '10%' }} />
                </div>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <div>🏠 Real Estate</div>
                  <div>📈 Investments</div>
                  <div>🚗 Vehicles</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">หนี้สิน</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Total Liabilities</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(client.financials.totalLiabilities)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-gray-600 text-sm">Debt-to-Asset Ratio</span>
                <span className="font-semibold text-gray-900">
                  {(
                    (client.financials.totalLiabilities / client.financials.totalAssets) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Cash Flow</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Income</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(client.financials.monthlyIncome)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Expenses</span>
                <span className="text-sm font-bold text-orange-600">
                  {formatCurrency(client.financials.monthlyExpenses)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (client.financials.monthlyExpenses / client.financials.monthlyIncome) *
                      100
                    }%`
                  }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Monthly Surplus</span>
                <span className="text-sm font-bold text-blue-600">
                  {formatCurrency(
                    client.financials.monthlyIncome - client.financials.monthlyExpenses
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail View */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ClientDetailView client={client} onEditClick={() => setIsEditMode(!isEditMode)} />
        </div>

        {/* Edit Mode Notice */}
        {isEditMode && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              ⚠️ โหมดแก้ไขขณะนี้ ในการใช้งานจริง ข้อมูลจะบันทึกไปยังฐานข้อมูล
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
