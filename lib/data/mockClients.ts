import { Client, ClientFilters, ClientSort } from '@/lib/types/client';

/**
 * Mock client data for demonstration
 */
export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'สมชาย จันทรา',
    email: 'somchai@email.com',
    phone: '0812345678',
    birthDate: '1980-05-15',
    nationality: 'TH',
    idNumber: '1234567890123',
    maritalStatus: 'married',
    occupationType: 'employee',
    jobTitle: 'วิศวกรซอฟต์แวร์',
    riskTolerance: 'MODERATE',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-10T15:30:00Z',
    status: 'active',
    profileCompletion: 95,
    lastReviewDate: '2024-06-10',
    financials: {
      totalAssets: 3400000,
      totalLiabilities: 1495000,
      netWorth: 1905000,
      monthlyIncome: 120000,
      monthlyExpenses: 85000,
      savingsRate: 29.17,
      emergencyFundMonths: 6,
    },
  },
  {
    id: '2',
    name: 'สุชาดา มนต์พิทักษ์',
    email: 'suchada@email.com',
    phone: '0898765432',
    birthDate: '1985-11-22',
    nationality: 'TH',
    idNumber: '2345678901234',
    maritalStatus: 'single',
    occupationType: 'self_employed',
    jobTitle: 'ที่ปรึกษาธุรกิจ',
    riskTolerance: 'AGGRESSIVE',
    createdAt: '2024-02-20T11:15:00Z',
    updatedAt: '2024-06-08T14:45:00Z',
    status: 'active',
    profileCompletion: 88,
    lastReviewDate: '2024-06-08',
    financials: {
      totalAssets: 5200000,
      totalLiabilities: 800000,
      netWorth: 4400000,
      monthlyIncome: 180000,
      monthlyExpenses: 95000,
      savingsRate: 47.22,
      emergencyFundMonths: 9,
    },
  },
  {
    id: '3',
    name: 'ประสิทธิ์ สินธารณ์',
    email: 'prasit@email.com',
    phone: '0867654321',
    birthDate: '1975-03-10',
    nationality: 'TH',
    idNumber: '3456789012345',
    maritalStatus: 'married',
    occupationType: 'business_owner',
    jobTitle: 'เจ้าของร้านค้า',
    riskTolerance: 'CONSERVATIVE',
    createdAt: '2024-03-05T09:30:00Z',
    updatedAt: '2024-05-20T16:00:00Z',
    status: 'active',
    profileCompletion: 72,
    lastReviewDate: '2024-05-20',
    financials: {
      totalAssets: 8500000,
      totalLiabilities: 2500000,
      netWorth: 6000000,
      monthlyIncome: 250000,
      monthlyExpenses: 120000,
      savingsRate: 52.0,
      emergencyFundMonths: 12,
    },
  },
  {
    id: '4',
    name: 'วิมลพร ศิริผล',
    email: 'wimonporn@email.com',
    phone: '0876543210',
    birthDate: '1992-07-18',
    nationality: 'TH',
    idNumber: '4567890123456',
    maritalStatus: 'single',
    occupationType: 'employee',
    jobTitle: 'นักบัญชี',
    riskTolerance: 'CONSERVATIVE',
    createdAt: '2024-04-12T13:20:00Z',
    updatedAt: '2024-06-05T10:15:00Z',
    status: 'active',
    profileCompletion: 65,
    lastReviewDate: '2024-06-05',
    financials: {
      totalAssets: 1500000,
      totalLiabilities: 300000,
      netWorth: 1200000,
      monthlyIncome: 45000,
      monthlyExpenses: 32000,
      savingsRate: 28.89,
      emergencyFundMonths: 4,
    },
  },
  {
    id: '5',
    name: 'ชัยศักดิ์ โชติวิทย์',
    email: 'chaisak@email.com',
    phone: '0845678901',
    birthDate: '1988-09-05',
    nationality: 'TH',
    idNumber: '5678901234567',
    maritalStatus: 'married',
    occupationType: 'employee',
    jobTitle: 'ผู้จัดการโครงการ',
    riskTolerance: 'MODERATE',
    createdAt: '2024-05-01T08:45:00Z',
    updatedAt: '2024-06-12T12:30:00Z',
    status: 'active',
    profileCompletion: 82,
    lastReviewDate: '2024-06-12',
    financials: {
      totalAssets: 2800000,
      totalLiabilities: 1000000,
      netWorth: 1800000,
      monthlyIncome: 95000,
      monthlyExpenses: 70000,
      savingsRate: 26.32,
      emergencyFundMonths: 5,
    },
  },
  {
    id: '6',
    name: 'ณัฐเนตร เพ็ชรศรี',
    email: 'nattanet@email.com',
    phone: '0856789012',
    birthDate: '1995-12-30',
    nationality: 'TH',
    idNumber: '6789012345678',
    maritalStatus: 'single',
    occupationType: 'student',
    jobTitle: 'นักศึกษา',
    riskTolerance: 'AGGRESSIVE',
    createdAt: '2024-06-01T14:00:00Z',
    updatedAt: '2024-06-15T09:00:00Z',
    status: 'prospect',
    profileCompletion: 35,
    lastReviewDate: null,
    financials: {
      totalAssets: 250000,
      totalLiabilities: 0,
      netWorth: 250000,
      monthlyIncome: 15000,
      monthlyExpenses: 12000,
      savingsRate: 20.0,
      emergencyFundMonths: 1,
    },
  },
];

/**
 * Filter and sort clients
 */
export function filterAndSortClients(
  clients: Client[],
  filters?: ClientFilters,
  sort?: ClientSort
): Client[] {
  let filtered = clients;

  // Apply filters
  if (filters) {
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }
    if (filters.riskTolerance) {
      filtered = filtered.filter((c) => c.riskTolerance === filters.riskTolerance);
    }
    if (filters.minNetWorth !== undefined) {
      filtered = filtered.filter((c) => c.financials.netWorth >= filters.minNetWorth!);
    }
    if (filters.maxNetWorth !== undefined) {
      filtered = filtered.filter((c) => c.financials.netWorth <= filters.maxNetWorth!);
    }
    if (filters.minProfileCompletion !== undefined) {
      filtered = filtered.filter((c) => c.profileCompletion >= filters.minProfileCompletion!);
    }
  }

  // Apply sorting
  if (sort) {
    filtered = [...filtered].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sort.field) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case 'netWorth':
          aVal = a.financials.netWorth;
          bVal = b.financials.netWorth;
          break;
        case 'profileCompletion':
          aVal = a.profileCompletion;
          bVal = b.profileCompletion;
          break;
      }

      if (sort.order === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
  }

  return filtered;
}

/**
 * Search clients by name, email, or phone
 */
export function searchClients(clients: Client[], query: string): Client[] {
  if (!query) return clients;

  const lowerQuery = query.toLowerCase();
  return clients.filter(
    (client) =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.email.toLowerCase().includes(lowerQuery) ||
      client.phone.includes(query)
  );
}

/**
 * Get client by ID
 */
export function getClientById(clients: Client[], id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}
