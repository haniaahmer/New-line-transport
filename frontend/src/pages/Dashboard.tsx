import React from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  MapPin,
  Car,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import KPICard from '@/components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mock chart data
const revenueData = [
  { month: 'Jan', revenue: 65000, bookings: 320 },
  { month: 'Feb', revenue: 78000, bookings: 390 },
  { month: 'Mar', revenue: 82000, bookings: 410 },
  { month: 'Apr', revenue: 95000, bookings: 475 },
  { month: 'May', revenue: 101000, bookings: 505 },
  { month: 'Jun', revenue: 118000, bookings: 590 },
];

const Dashboard = () => {
  const { kpiData, bookings, drivers } = useDashboardStore();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const recentBookings = bookings.slice(0, 5);
  const activeDrivers = drivers.filter(driver => driver.status === 'active' || driver.status === 'on-trip');

  return (
    <div className="flex items-center justify-center min-h-screen mt-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Bookings"
            value={kpiData.totalBookings.toLocaleString()}
            trend={kpiData.bookingsTrend}
            icon={Calendar}
            gradient="primary"
          />
          <KPICard
            title="Active Drivers"
            value={kpiData.activeDrivers}
            trend={kpiData.driversTrend}
            icon={Users}
            gradient="success"
          />
          <KPICard
            title="Total Revenue"
            value={formatCurrency(kpiData.totalRevenue)}
            trend={kpiData.revenueTrend}
            icon={DollarSign}
            gradient="accent"
          />
          <KPICard
            title="Completed Rides"
            value={kpiData.completedRides.toLocaleString()}
            trend={kpiData.ridesTrend}
            icon={CheckCircle}
            gradient="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Monthly Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="bookings" 
                    fill="hsl(var(--accent))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{booking.customerName}</p>
                        <Badge 
                          variant={
                            booking.status === 'confirmed' ? 'default' :
                            booking.status === 'in-progress' ? 'secondary' :
                            booking.status === 'pending' ? 'outline' : 'destructive'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.pickupLocation} → {booking.destination}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.scheduledTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatCurrency(booking.fare)}</p>
                      <p className="text-xs text-muted-foreground">{booking.bookingType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Drivers */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-success" />
                Active Drivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDrivers.slice(0, 6).map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-success rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-success-foreground">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{driver.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Rating: {driver.rating} ⭐
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        driver.status === 'on-trip' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {driver.status === 'on-trip' ? 'On Trip' : 'Available'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Driver Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-secondary/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive map will be integrated here</p>
                <p className="text-xs text-muted-foreground">Showing real-time driver positions and active routes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;