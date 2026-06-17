'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_CLIENTS, searchClients, filterAndSortClients } from '@/lib/data/mockClients';
import { ClientFilters } from '@/components/clients/ClientFilters';
import { ClientCard } from '@/components/clients/ClientCard';
import { ClientTable } from '@/components/clients/ClientTable';
import { ClientFilters as ClientFiltersType, ClientSort } from '@/lib/types/client';

type ViewMode = 'grid' | 'table';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ClientFiltersType>({});
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<ClientSort['field']>('createdAt');
  const [sortOrder, setSortOrder] = useState<ClientSort['order']>('desc');

  // Filter and sort clients
  const displayedClients = useMemo(() => {
    let clients = MOCK_CLIENTS;

    // Apply search
    if (searchQuery) {
      clients = searchClients(clients, searchQuery);
    }

    // Apply filters and sorting
    clients = filterAndSortClients(clients, filters, {
      field: sortField,
      order: sortOrder,
    });

    return clients;
  }, [searchQuery, filters, sortField, sortOrder]);

  const activeClientsCount = MOCK_CLIENTS.filter((c) => c.status === 'active').length;
  const totalNetWorth = MOCK_CLIENTS.reduce((sum, c) => sum + c.financials.netWorth, 0);
  const averageProfileCompletion =
    MOCK_CLIENTS.reduce((sum, c) => sum + c.profileCompletion, 0) / MOCK_CLIENTS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Client Management</h1>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              จัดการและติดตามลูกค้าของคุณ
            </p>
          </div>
          <Link
            href="/clients/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
            ➕ เพิ่มลูกค้าใหม่
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">ลูกค้าทั้งหมด</p>
          <p className="text-3xl font-bold text-gray-900">{MOCK_CLIENTS.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">ลูกค้าใช้งาน</p>
          <p className="text-3xl font-bold text-green-600">{activeClientsCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Total Net Worth</p>
          <p className="text-3xl font-bold text-blue-600">
            ฿{(totalNetWorth / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Filters */}
      <ClientFilters
        onFilterChange={setFilters}
        onSearchChange={setSearchQuery}
      />

      {/* View Mode & Sort Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📊 Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📋 Table
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as ClientSort['field'])}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="createdAt">วันที่สร้าง</option>
            <option value="name">ชื่อ</option>
            <option value="netWorth">Net Worth</option>
            <option value="profileCompletion">Profile Completion</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        แสดง {displayedClients.length} จาก {MOCK_CLIENTS.length} ลูกค้า
      </div>

      {/* Clients Display */}
      {displayedClients.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ClientTable clients={displayedClients} />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">ไม่พบลูกค้าที่ตรงกับเงื่อนไข</p>
          <p className="text-gray-400 text-sm mb-6">ลองปรับเปลี่ยนการค้นหาหรือตัวกรอง</p>
          <Link
            href="/clients/new"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ➕ เพิ่มลูกค้าใหม่
          </Link>
        </div>
      )}
    </div>
  );
}
