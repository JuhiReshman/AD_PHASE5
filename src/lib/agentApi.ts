import axios from 'axios';

export interface AgentStats {
  packagesManaged: number;
  bookings: number;
  earnings: number;
}

export interface AgentPackage {
  id: number;
  name: string;
  status: string;
  bookings: number;
}

export interface AgentBooking {
  id: number;
  customer: string;
  package: string;
  date: string;
  status: string;
}

export interface CustomerInquiry {
  id: number;
  customer: string;
  message: string;
  time: string;
}

// Updated to use API Gateway
const api = axios.create({
  baseURL: 'http://localhost:9999/user-api', // Using Gateway port 9999
  timeout: 10000,
});

// Add auth token to requests - Fixed token key
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Changed from 'authToken' to 'token'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getAgentStats(): Promise<AgentStats> {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch agent stats:', error);
    // Return mock data as fallback
    return {
      packagesManaged: 12,
      bookings: 48,
      earnings: 210000
    };
  }
}

export async function getAgentPackages(): Promise<AgentPackage[]> {
  try {
    const response = await api.get('/packages');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch agent packages:', error);
    // Return mock data as fallback
    return [
      { id: 1, name: 'Goa Beach Escape', status: 'Active', bookings: 18 },
      { id: 2, name: 'Shimla Hills', status: 'Active', bookings: 12 },
    ];
  }
}

export async function getAgentBookings(): Promise<AgentBooking[]> {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch agent bookings:', error);
    // Return mock data as fallback
    return [
      { id: 201, customer: 'Ayush Sharma', package: 'Goa Beach Escape', date: '2024-07-10', status: 'Confirmed' },
      { id: 202, customer: 'Priya Singh', package: 'Shimla Hills', date: '2024-07-09', status: 'Pending' },
    ];
  }
}

export async function getCustomerInquiries(): Promise<CustomerInquiry[]> {
  try {
    const response = await api.get('/inquiries');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer inquiries:', error);
    // Return mock data as fallback
    return [
      { id: 1, customer: 'Rohit Verma', message: 'Can I get a discount?', time: '5 min ago' },
      { id: 2, customer: 'Neha Patel', message: 'Is breakfast included?', time: '20 min ago' },
    ];
  }
}

export async function createAgentPackage(packageData: { name: string; description?: string; price?: number }): Promise<AgentPackage> {
  try {
    const response = await api.post('/packages', packageData);
    return response.data;
  } catch (error) {
    console.error('Failed to create agent package:', error);
    throw error;
  }
}

export async function updateAgentPackage(packageId: number, packageData: Partial<AgentPackage>): Promise<AgentPackage> {
  try {
    const response = await api.put(`/packages/${packageId}`, packageData);
    return response.data;
  } catch (error) {
    console.error('Failed to update agent package:', error);
    throw error;
  }
}

export async function deleteAgentPackage(packageId: number): Promise<void> {
  try {
    await api.delete(`/packages/${packageId}`);
  } catch (error) {
    console.error('Failed to delete agent package:', error);
    throw error;
  }
}

export async function updateBookingStatus(bookingId: number, status: string): Promise<void> {
  try {
    await api.put(`/bookings/${bookingId}/status`, { status });
  } catch (error) {
    console.error('Failed to update booking status:', error);
    throw error;
  }
}

export async function respondToInquiry(inquiryId: number, response: string): Promise<void> {
  try {
    await api.post(`/inquiries/${inquiryId}/respond`, { response });
  } catch (error) {
    console.error('Failed to respond to inquiry:', error);
    throw error;
  }
} 