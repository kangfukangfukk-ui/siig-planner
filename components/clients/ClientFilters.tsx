'use client';

import React, { useState, useCallback } from 'react';
import { RiskTolerance } from '@/lib/types/client';

interface ClientFiltersProps {
  onFilterChange: (filters: {
    status?: 'active' | 'inactive' | 'prospect';
    riskTolerance?: RiskTolerance;
    minProfileCompletion?: number;
  }) => void;
  onSearchChange: (query: string) => void;
}

export function ClientFilters({ onFilterChange, onSearchChange }: ClientFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | 'prospect' | ''>('');
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance | ''>('');
  const [minProfileCompletion, setMinProfileCompletion] = useState<number | ''>('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  const handleFilterChange = useCallback(() => {
    const filters: any = {};
    if (status) filters.status = status;
    if (riskTolerance) filters.riskTolerance = riskTolerance;
    if (minProfileCompletion !== '') filters.minProfileCompletion = minProfileCompletion;
    onFilterChange(filters);
  }, [status, riskTolerance, minProfileCompletion, onFilterChange]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as any);
  };

  const handleRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRiskTolerance(e.target.value as RiskTolerance);
  };

  const handleProfileCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinProfileCompletion(e.target.value ? parseInt(e.target.value) : '');
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [status, riskTolerance, minProfileCompletion, handleFilterChange]);

  const handleReset = () => {
    setSearchQuery('');
    setStatus('');
    setRiskTolerance('');
    setMinProfileCompletion('');
    onSearchChange('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">ค้นหาและกรองลูกค้า</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
          <input
            type="text"
            placeholder="ชื่อ, อีเมล, เบอร์"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">ทั้งหมด</option>
            <option value="active">ใช้งาน</option>
            <option value="inactive">ปิดใช้งาน</option>
            <option value="prospect">ผู้สนใจ</option>
          </select>
        </div>

        {/* Risk Tolerance Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ความเสี่ยง</label>
          <select
            value={riskTolerance}
            onChange={handleRiskChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">ทั้งหมด</option>
            <option value="CONSERVATIVE">ระมัดระวัง</option>
            <option value="MODERATE">ปานกลาง</option>
            <option value="AGGRESSIVE">ก้าวร้าว</option>
          </select>
        </div>

        {/* Profile Completion Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ความสมบูรณ์ ({minProfileCompletion === '' ? '0' : minProfileCompletion}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={minProfileCompletion === '' ? 0 : minProfileCompletion}
            onChange={handleProfileCompletionChange}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            รีเซต
          </button>
        </div>
      </div>
    </div>
  );
}
