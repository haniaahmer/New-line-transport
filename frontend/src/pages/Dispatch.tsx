import React from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  Route,
  RefreshCw,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Dispatch = () => {
  const { bookings, drivers } = useDashboardStore();
  
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const activeBookings = bookings.filter(booking => booking.status === 'in-progress');
  const availableDrivers = drivers.filter(driver => driver.status === 'active');
  
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDriverDistance = (driverId) => {
    // Mock distance calculation
    return (Math.random() * 15 + 0.5).toFixed(1);
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dispatch Center</h1>
            <p className="text-muted-foreground">Real-time booking dispatch and driver allocation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Auto Dispatch: ON
            </Button>
            <Button className="gap-2">
              <MapPin className="h-4 w-4" />
              View Map
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Dispatch</p>
                  <p className="text-2xl font-bold">{pendingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Route className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Trips</p>
                  <p className="text-2xl font-bold">{activeBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Drivers</p>
                  <p className="text-2xl font-bold">{availableDrivers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dispatch Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dispatch Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Pending Dispatch ({pendingBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingBookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No pending bookings</p>
                  </div>
                ) : (
                  pendingBookings.map((booking) => (
                    <div key={booking.id} className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{booking.customerName}</h4>
                            <Badge variant="outline">{booking.bookingType}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-primary" />
                              <span>{booking.pickupLocation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Navigation className="h-3 w-3 text-accent" />
                              <span>{booking.destination}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>Scheduled: {formatTime(booking.scheduledTime)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${booking.fare}</p>
                          <p className="text-xs text-muted-foreground">Waiting: 5 min</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-1">
                          <Play className="h-3 w-3" />
                          Auto Assign
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Users className="h-3 w-3" />
                          Manual Assign
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                Available Drivers ({availableDrivers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDrivers.map((driver) => (
                  <div key={driver.id} className="border border-border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 gradient-success rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-success-foreground">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{driver.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">★ {driver.rating}</span>
                          <span className="text-xs text-muted-foreground">• {driver.totalTrips} trips</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Distance: {getDriverDistance(driver.id)} km</span>
                      <Badge className="bg-success/10 text-success text-xs">
                        Available
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              Active Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No active trips
                      </TableCell>
                    </TableRow>
                  ) : (
                    activeBookings.map((booking) => {
                      const assignedDriver = drivers.find(d => d.id === booking.driverId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {assignedDriver && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">
                                    {assignedDriver.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="text-sm">{assignedDriver.name}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-primary" />
                                {booking.pickupLocation}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Navigation className="h-3 w-3 text-accent" />
                                {booking.destination}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-success text-success-foreground">
                              En Route
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">12 min</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }} />
                              </div>
                              <span className="text-xs text-muted-foreground">65%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dispatch;