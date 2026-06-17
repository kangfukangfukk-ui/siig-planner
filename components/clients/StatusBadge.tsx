'use client';

import React from 'react';

export type StatusType = 'active' | 'inactive' | 'prospect';
export type RiskToleranceType = 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';

interface StatusBadgeProps {
  status: StatusType;
}

interface RiskToleranceBadgeProps {
  riskTolerance: RiskToleranceType | null;
}

const statusConfig = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'ใช้งาน',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'ปิดใช้งาน',
  },
  prospect: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'ผู้สนใจ',
  },
};

const riskConfig = {
  CONSERVATIVE: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'ระมัดระวัง',
  },
  MODERATE: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'ปานกลาง',
  },
  AGGRESSIVE: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'ก้าวร้าว',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export function RiskToleranceBadge({ riskTolerance }: RiskToleranceBadgeProps) {
  if (!riskTolerance) return null;
  const config = riskConfig[riskTolerance];
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
