import { create } from 'zustand';

export interface KPIData {
  totalBookings: number;
  activeDrivers: number;
  totalRevenue: number;
  completedRides: number;
  bookingsTrend: number;
  driversTrend: number;
  revenueTrend: number;
  ridesTrend: number;
}

export interface Booking {
  id: string;
  customerName: string;
  pickupLocation: string;
  destination: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  bookingType: 'point-to-point' | 'hourly' | 'full-day';
  fare: number;
  driverId?: string;
  createdAt: string;
  scheduledTime: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-trip' | 'offline';
  rating: number;
  totalTrips: number;
  vehicleId: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  type: 'sedan' | 'suv' | 'van' | 'luxury';
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'retail' | 'corporate';
  totalBookings: number;
  totalSpent: number;
  registeredAt: string;
}

interface DashboardStore {
  // Data
  kpiData: KPIData;
  bookings: Booking[];
  drivers: Driver[];
  vehicles: Vehicle[];
  customers: Customer[];
  
  // UI State
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  darkMode: boolean;
  sidebarWidth: number;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  toggleDarkMode: () => void;
  setKPIData: (data: KPIData) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  updateDriverStatus: (id: string, status: Driver['status']) => void;
  setSidebarWidth: (width: number) => void;
}

// Mock data
const mockKPIData: KPIData = {
  totalBookings: 1234,
  activeDrivers: 89,
  totalRevenue: 145670,
  completedRides: 1156,
  bookingsTrend: 12.5,
  driversTrend: 8.3,
  revenueTrend: 15.7,
  ridesTrend: 9.8,
};

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    pickupLocation: 'Downtown Plaza',
    destination: 'Airport Terminal 1',
    status: 'confirmed',
    bookingType: 'point-to-point',
    fare: 45.50,
    driverId: 'driver-1',
    createdAt: '2024-01-15T10:30:00Z',
    scheduledTime: '2024-01-15T14:00:00Z',
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    pickupLocation: 'Business District',
    destination: 'Hotel Grand',
    status: 'in-progress',
    bookingType: 'point-to-point',
    fare: 28.75,
    driverId: 'driver-2',
    createdAt: '2024-01-15T09:15:00Z',
    scheduledTime: '2024-01-15T13:30:00Z',
  },
  {
    id: '3',
    customerName: 'Emma Rodriguez',
    pickupLocation: 'City Mall',
    destination: 'Various stops',
    status: 'pending',
    bookingType: 'hourly',
    fare: 120.00,
    createdAt: '2024-01-15T11:45:00Z',
    scheduledTime: '2024-01-15T15:00:00Z',
  },
];

const mockDrivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'John Smith',
    email: 'john.smith@logistifie.com',
    phone: '+1-555-0101',
    status: 'on-trip',
    rating: 4.8,
    totalTrips: 342,
    vehicleId: 'vehicle-1',
    location: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 'driver-2',
    name: 'Maria Garcia',
    email: 'maria.garcia@logistifie.com',
    phone: '+1-555-0102',
    status: 'active',
    rating: 4.9,
    totalTrips: 278,
    vehicleId: 'vehicle-2',
    location: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: 'driver-3',
    name: 'David Lee',
    email: 'david.lee@logistifie.com',
    phone: '+1-555-0103',
    status: 'active',
    rating: 4.7,
    totalTrips: 195,
    vehicleId: 'vehicle-3',
    location: { lat: 40.7614, lng: -73.9776 },
  },
];

const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle-1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    licensePlate: 'ABC-123',
    type: 'sedan',
    status: 'active',
  },
  {
    id: 'vehicle-2',
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    licensePlate: 'XYZ-789',
    type: 'suv',
    status: 'active',
  },
  {
    id: 'vehicle-3',
    make: 'Mercedes',
    model: 'E-Class',
    year: 2023,
    licensePlate: 'LUX-456',
    type: 'luxury',
    status: 'active',
  },
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-1001',
    type: 'retail',
    totalBookings: 15,
    totalSpent: 674.25,
    registeredAt: '2023-08-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'TechCorp Inc.',
    email: 'bookings@techcorp.com',
    phone: '+1-555-2001',
    type: 'corporate',
    totalBookings: 89,
    totalSpent: 12845.50,
    registeredAt: '2023-06-01T00:00:00Z',
  },
];

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial data
  kpiData: mockKPIData,
  bookings: mockBookings,
  drivers: mockDrivers,
  vehicles: mockVehicles,
  customers: mockCustomers,
  
  // UI state
  sidebarOpen: true,
  sidebarCollapsed: false,
  darkMode: false,
  sidebarWidth: 288,
  
  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setKPIData: (data) => set({ kpiData: data }),
  addBooking: (booking) => 
    set((state) => ({ 
      bookings: [booking, ...state.bookings] 
    })),
  updateBooking: (id, updates) => 
    set((state) => ({
      bookings: state.bookings.map(booking => 
        booking.id === id ? { ...booking, ...updates } : booking
      )
    })),
  updateDriverStatus: (id, status) => 
    set((state) => ({
      drivers: state.drivers.map(driver => 
        driver.id === id ? { ...driver, status } : driver
      )
    })),
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
}));