import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar,
  MapPin,
  User,
  DollarSign,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Bookings = () => {
  const { bookings, addBooking } = useDashboardStore(); // Assuming addBooking exists in the store
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-primary text-primary-foreground';
      case 'in-progress': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-accent text-accent-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    account: '',
    costCenter: '',
    invoiceRef: '',
    nameCard: null,
    booker: '',
    passenger: '',
    vehicleCategory: '',
    vehicleType: '',
    driver: '',
    journeyType: 'one-way',
    pickUpDate: '',
    pickUpTime: '',
    pickUp: '',
    dropOff: '',
    passengers: 0,
    bigLuggage: 0,
    smallLuggage: 0,
    baby: 0,
    child: 0,
    booster: 0,
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, nameCard: e.target.files[0] }));
  };

  const handleSubmit = () => {
    const newBooking = {
      id: `BOOKING-${Date.now()}`,
      customerName: formData.passenger,
      pickupLocation: formData.pickUp,
      destination: formData.dropOff,
      bookingType: formData.journeyType,
      status: 'pending',
      scheduledTime: new Date(`${formData.pickUpDate}T${formData.pickUpTime}`),
      fare: 0, // Placeholder, calculate if needed
    };
    addBooking(newBooking);
    setIsOpen(false);
    // Reset form if needed
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
            <p className="text-muted-foreground">Manage all taxi and rental bookings</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className=" bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105">
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl p-6">
              <DialogHeader>
                <DialogTitle>Select Account to Allocate Job</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Account Section */}
                  <div>
                    <Label>Select Account*</Label>
                    <Select value={formData.account} onValueChange={(value) => setFormData((prev) => ({ ...prev, account: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account1">Account 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Cost Center</Label>
                      <Input value={formData.costCenter} name="costCenter" onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label>Invoice Ref</Label>
                      <Input value={formData.invoiceRef} name="invoiceRef" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name card (override)</Label>
                      <Input value={formData.nameCard ? formData.nameCard.name : ''} readOnly />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button variant="outline" onClick={() => document.getElementById('namecard-upload').click()}>Browse</Button>
                      <input id="namecard-upload" type="file" hidden onChange={handleFileChange} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Available Namecard In Account</p>

                  {/* Booker Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Select or Add Booker</Label>
                      <div className="flex gap-2">
                        <Button variant="link">+ Preset Booker</Button>
                        <Button variant="link">+ Quick Add</Button>
                      </div>
                    </div>
                    <Select value={formData.booker} onValueChange={(value) => setFormData((prev) => ({ ...prev, booker: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Booker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booker1">Booker 1</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="link" className="mt-2">+ Additional Booker</Button>
                  </div>

                  {/* Passenger Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Select or Add Passenger</Label>
                      <div className="flex gap-2">
                        <Button variant="link">+ Preset Passenger</Button>
                        <Button variant="link">+ Quick Add</Button>
                      </div>
                    </div>
                    <Select value={formData.passenger} onValueChange={(value) => setFormData((prev) => ({ ...prev, passenger: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Passenger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passenger1">Passenger 1</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="link" className="mt-2">+ Additional Passenger</Button>
                  </div>

                  {/* Vehicle Selection */}
                  <div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Vehicle Selection</Label>
                      </div>
                      <div>
                        <Label>Distance</Label>
                      </div>
                      <div>
                        <Label>Duration</Label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label>Preferred Vehicle Category*</Label>
                        <Select value={formData.vehicleCategory} onValueChange={(value) => setFormData((prev) => ({ ...prev, vehicleCategory: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Vehicle Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="van">VAN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Select Vehicle Type</Label>
                        <Select value={formData.vehicleType} onValueChange={(value) => setFormData((prev) => ({ ...prev, vehicleType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Vehicle Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="type1">Type 1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Select Driver</Label>
                        <Select value={formData.driver} onValueChange={(value) => setFormData((prev) => ({ ...prev, driver: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Driver" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="driver1">Driver 1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Journey Details</Label>
                      <Select value={formData.journeyType} onValueChange={(value) => setFormData((prev) => ({ ...prev, journeyType: value }))}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Transfer (One Way)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-way">Transfer (One Way)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Pick-Up Date (dd/mm/yyyy)</Label>
                        <Input type="date" name="pickUpDate" value={formData.pickUpDate} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Pick-Up Time (HH:mm)</Label>
                        <Input type="time" name="pickUpTime" value={formData.pickUpTime} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Pick Up*</Label>
                      <Input name="pickUp" value={formData.pickUp} onChange={handleInputChange} placeholder="Pick Up" />
                    </div>
                    <div className="mt-4">
                      <Label>Drop Off*</Label>
                      <Input name="dropOff" value={formData.dropOff} onChange={handleInputChange} placeholder="Drop Off" />
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-4">
                      <div>
                        <Label>Passenger</Label>
                        <Input type="number" name="passengers" value={formData.passengers} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Big Luggage</Label>
                        <Input type="number" name="bigLuggage" value={formData.bigLuggage} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Small Luggage</Label>
                        <Input type="number" name="smallLuggage" value={formData.smallLuggage} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Baby</Label>
                        <Input type="number" name="baby" value={formData.baby} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Child</Label>
                        <Input type="number" name="child" value={formData.child} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label>Booster</Label>
                        <Input type="number" name="booster" value={formData.booster} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <Label>Additional Info</Label>
                    <Input name="note" value={formData.note} onChange={handleInputChange} placeholder="Note/POA" />
                  </div>

                  <Button className="bg-green-500 text-white" onClick={handleSubmit}>Save and Proceed</Button>
                </div>
                <div>
                  {/* Map Placeholder */}
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    Map
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Clock className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">{statusCounts.confirmed || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{statusCounts['in-progress'] || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(bookings.reduce((sum, booking) => sum + booking.fare, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by customer name, pickup, or destination..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>

            {/* Bookings Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span className="text-sm">{booking.pickupLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-accent" />
                            <span className="text-sm">{booking.destination}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">{booking.bookingType}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(booking.scheduledTime).toLocaleDateString()}
                          <br />
                          <span className="text-muted-foreground">
                            {new Date(booking.scheduledTime).toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{formatCurrency(booking.fare)}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            <DropdownMenuItem>Assign Driver</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookings;