'use client';

import React from 'react';
import Link from 'next/link';
import { Client } from '@/lib/types/client';
import { StatusBadge, RiskToleranceBadge } from './StatusBadge';

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      notation: 'compact',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">ไม่พบลูกค้า</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              ชื่อ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              อีเมล
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Net Worth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              ความเสี่ยง
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              สถานะ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              วันสร้าง
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              การกระทำ
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client) => (
            <tr
              key={client.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{client.name}</div>
                <div className="text-sm text-gray-500">{client.jobTitle}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {client.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-gray-900">
                  {formatCurrency(client.financials.netWorth)}
                </div>
                <div className="text-xs text-gray-500">
                  Monthly: {formatCurrency(client.financials.monthlyIncome)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {client.riskTolerance && (
                  <RiskToleranceBadge riskTolerance={client.riskTolerance} />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={client.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {formatDate(client.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  href={`/clients/${client.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ดู
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
