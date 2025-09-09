import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter,
  Users,
  Car,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Mock analytics data
const monthlyRevenue = [
  { month: 'Jan', revenue: 65000, trips: 320, drivers: 45 },
  { month: 'Feb', revenue: 78000, trips: 390, drivers: 48 },
  { month: 'Mar', revenue: 82000, trips: 410, drivers: 52 },
  { month: 'Apr', revenue: 95000, trips: 475, drivers: 55 },
  { month: 'May', revenue: 101000, trips: 505, drivers: 58 },
  { month: 'Jun', revenue: 118000, trips: 590, drivers: 62 },
];

const driverPerformance = [
  { name: 'John Smith', trips: 89, revenue: 2340, rating: 4.9 },
  { name: 'Maria Garcia', trips: 76, revenue: 1980, rating: 4.8 },
  { name: 'David Lee', trips: 68, revenue: 1750, rating: 4.7 },
  { name: 'Sarah Wilson', trips: 65, revenue: 1690, rating: 4.8 },
  { name: 'Mike Johnson', trips: 58, revenue: 1520, rating: 4.6 },
];

const serviceTypes = [
  { name: 'Point-to-Point', value: 45, color: '#3b82f6' },
  { name: 'Hourly', value: 30, color: '#10b981' }, 
  { name: 'Full Day', value: 25, color: '#f59e0b' },
];

const slaMetrics = [
  { metric: 'On-Time Performance', value: 94.2, target: 95, status: 'warning' },
  { metric: 'Customer Satisfaction', value: 4.7, target: 4.5, status: 'success' },
  { metric: 'Driver Utilization', value: 87.5, target: 85, status: 'success' },
  { metric: 'Booking Completion Rate', value: 96.8, target: 95, status: 'success' },
];

const Reports = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return AlertTriangle;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Performance metrics, KPIs, and business intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter Reports
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">$118K</p>
                <p className="text-xs text-success">+15.7% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Car className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Trips</p>
                <p className="text-2xl font-bold">590</p>
                <p className="text-xs text-success">+9.8% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">62</p>
                <p className="text-xs text-success">+8.3% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Trip Value</p>
                <p className="text-2xl font-bold">$42.50</p>
                <p className="text-xs text-success">+5.2% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Revenue & Trips Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
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

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Service Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Drivers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              Top Driver Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverPerformance.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {driver.trips} trips • ⭐ {driver.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(driver.revenue)}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              SLA Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slaMetrics.map((sla, index) => {
                const StatusIcon = getStatusIcon(sla.status);
                const percentage = sla.metric === 'Customer Satisfaction' ? 
                  ((sla.value / 5) * 100) : 
                  (sla.value);
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(sla.status)}`} />
                        <span className="text-sm font-medium">{sla.metric}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">
                          {sla.metric === 'Customer Satisfaction' ? sla.value.toFixed(1) : `${sla.value}%`}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          / {sla.metric === 'Customer Satisfaction' ? sla.target.toFixed(1) : `${sla.target}%`}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          sla.status === 'success' ? 'bg-success' :
                          sla.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ 
                          width: `${Math.min(percentage, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="gap-2 h-auto flex-col p-6">
              <Clock className="h-6 w-6 text-primary" />
              <span className="font-medium">Driver Payouts</span>
              <span className="text-xs text-muted-foreground">Weekly/Monthly</span>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto flex-col p-6">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <span className="font-medium">Cancellation Report</span>
              <span className="text-xs text-muted-foreground">Trends & Reasons</span>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto flex-col p-6">
              <Users className="h-6 w-6 text-accent" />
              <span className="font-medium">Customer Analytics</span>
              <span className="text-xs text-muted-foreground">Behavior & Retention</span>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto flex-col p-6">
              <TrendingUp className="h-6 w-6 text-success" />
              <span className="font-medium">Financial Summary</span>
              <span className="text-xs text-muted-foreground">P&L Statement</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;