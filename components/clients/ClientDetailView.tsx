'use client';

import React from 'react';
import { Client } from '@/lib/types/client';
import { RiskToleranceBadge } from './StatusBadge';

interface ClientDetailSectionProps {
  label: string;
  children: React.ReactNode;
}

interface ClientDetailViewProps {
  client: Client;
  onEditClick: () => void;
}

function DetailSection({ label, children }: ClientDetailSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{label}</h3>
      <div className="bg-gray-50 rounded-lg p-4">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export function ClientDetailView({ client, onEditClick }: ClientDetailViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      notation: 'standard',
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const occupationMap: Record<string, string> = {
    employee: 'พนักงาน',
    self_employed: 'อิสระ',
    business_owner: 'เจ้าของธุรกิจ',
    retired: 'เกษียณ',
    student: 'นักศึกษา',
    other: 'อื่นๆ',
  };

  const maritalStatusMap: Record<string, string> = {
    single: 'โสด',
    married: 'แต่งงาน',
    divorced: 'หย่า',
    widowed: 'เป็นม่าย',
  };

  return (
    <div className="space-y-6">
      {/* Edit Button */}
      <button
        onClick={onEditClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        ✏️ แก้ไขข้อมูล
      </button>

      {/* Personal Information */}
      <DetailSection label="ข้อมูลส่วนตัว">
        <DetailRow label="ชื่อ-นามสกุล" value={client.name} />
        <DetailRow label="อีเมล" value={client.email} />
        <DetailRow label="เบอร์โทรศัพท์" value={client.phone} />
        <DetailRow label="วันเกิด" value={formatDate(client.birthDate)} />
        <DetailRow label="สัญชาติ" value={client.nationality || '-'} />
        <DetailRow label="เลขบัตรประชาชน" value={client.idNumber || '-'} />
        <DetailRow label="สถานภาพการสมรส" value={client.maritalStatus ? maritalStatusMap[client.maritalStatus] : '-'} />
      </DetailSection>

      {/* Career Information */}
      <DetailSection label="ข้อมูลอาชีพ">
        <DetailRow
          label="ประเภทการจ้างงาน"
          value={client.occupationType ? occupationMap[client.occupationType] : '-'}
        />
        <DetailRow label="ตำแหน่งงาน" value={client.jobTitle || '-'} />
      </DetailSection>

      {/* Financial Information */}
      <DetailSection label="ข้อมูลการเงิน">
        <DetailRow
          label="สินทรัพย์รวม"
          value={formatCurrency(client.financials.totalAssets)}
        />
        <DetailRow
          label="หนี้สินรวม"
          value={formatCurrency(client.financials.totalLiabilities)}
        />
        <DetailRow
          label="Net Worth"
          value={formatCurrency(client.financials.netWorth)}
        />
        <DetailRow
          label="รายได้รายเดือน"
          value={formatCurrency(client.financials.monthlyIncome)}
        />
        <DetailRow
          label="รายจ่ายรายเดือน"
          value={formatCurrency(client.financials.monthlyExpenses)}
        />
        <DetailRow
          label="Savings Rate"
          value={`${client.financials.savingsRate.toFixed(2)}%`}
        />
        <DetailRow
          label="Emergency Fund"
          value={`${client.financials.emergencyFundMonths} เดือน`}
        />
      </DetailSection>

      {/* Investment Profile */}
      <DetailSection label="โปรไฟล์การลงทุน">
        <DetailRow
          label="ความโน้มเอียงต่อความเสี่ยง"
          value={client.riskTolerance && <RiskToleranceBadge riskTolerance={client.riskTolerance} />}
        />
        <DetailRow
          label="ความสมบูรณ์ของโปรไฟล์"
          value={`${client.profileCompletion}%`}
        />
      </DetailSection>

      {/* Activity */}
      <DetailSection label="กิจกรรม">
        <DetailRow
          label="วันที่สร้าง"
          value={formatDate(client.createdAt)}
        />
        <DetailRow
          label="วันที่อัปเดต"
          value={formatDate(client.updatedAt)}
        />
        <DetailRow
          label="วันที่ตรวจสอบล่าสุด"
          value={formatDate(client.lastReviewDate)}
        />
      </DetailSection>
    </div>
  );
}
