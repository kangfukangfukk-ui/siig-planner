'use client';

import React from 'react';
import Link from 'next/link';
import { Client } from '@/lib/types/client';
import { StatusBadge, RiskToleranceBadge } from './StatusBadge';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      notation: 'compact',
    }).format(value);
  };

  return (
    <Link href={`/clients/${client.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">{client.jobTitle}</p>
          </div>
          <StatusBadge status={client.status} />
        </div>

        {/* Contact Info */}
        <div className="mb-4 space-y-1 text-sm text-gray-600">
          <p>📧 {client.email}</p>
          <p>📱 {client.phone}</p>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-600">Net Worth</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(client.financials.netWorth)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Monthly Income</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(client.financials.monthlyIncome)}
            </p>
          </div>
        </div>

        {/* Risk & Profile Completion */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {client.riskTolerance && <RiskToleranceBadge riskTolerance={client.riskTolerance} />}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600 mb-1">Profile Completion</div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${client.profileCompletion}%` }}
              />
            </div>
            <p className="text-xs font-medium text-gray-700 mt-1">{client.profileCompletion}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
