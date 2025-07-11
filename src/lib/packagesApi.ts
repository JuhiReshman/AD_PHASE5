import axios from 'axios';
import { API_CONFIG, getApiUrl } from './apiConfig';

export interface TravelPackageDto {
  packageId: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  includeService: string;
  image?: string;
  highlights?: string;
  flights: any[];
  hotels: any[];
  sightseeingList: any[];
}

// Configure axios with standardized settings
const api = axios.create({
  timeout: API_CONFIG.REQUEST.TIMEOUT,
  headers: API_CONFIG.REQUEST.HEADERS,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchAllPackages(): Promise<TravelPackageDto[]> {
  try {
    const response = await api.get(getApiUrl('PACKAGE_SERVICE', API_CONFIG.PACKAGE_SERVICE.ENDPOINTS.ALL));
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch packages:', error);
    throw new Error('Failed to fetch packages. Please try again.');
  }
}

export async function fetchPackageById(id: number): Promise<TravelPackageDto> {
  try {
    const response = await api.get(getApiUrl('PACKAGE_SERVICE', API_CONFIG.PACKAGE_SERVICE.ENDPOINTS.BY_ID(id)));
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch package:', error);
    throw new Error('Failed to fetch package. Please try again.');
  }
}

export async function createPackage(packageData: Omit<TravelPackageDto, 'packageId'>): Promise<TravelPackageDto> {
  try {
    const response = await api.post(getApiUrl('PACKAGE_SERVICE', API_CONFIG.PACKAGE_SERVICE.ENDPOINTS.CREATE), packageData);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create package:', error);
    throw new Error('Failed to create package. Please try again.');
  }
}

export async function updatePackage(id: number, packageData: Partial<TravelPackageDto>): Promise<TravelPackageDto> {
  try {
    const response = await api.put(getApiUrl('PACKAGE_SERVICE', API_CONFIG.PACKAGE_SERVICE.ENDPOINTS.UPDATE(id)), packageData);
    return response.data;
  } catch (error: any) {
    console.error('Failed to update package:', error);
    throw new Error('Failed to update package. Please try again.');
  }
}

export async function deletePackage(id: number): Promise<void> {
  try {
    await api.delete(getApiUrl('PACKAGE_SERVICE', API_CONFIG.PACKAGE_SERVICE.ENDPOINTS.DELETE(id)));
  } catch (error: any) {
    console.error('Failed to delete package:', error);
    throw new Error('Failed to delete package. Please try again.');
  }
} 