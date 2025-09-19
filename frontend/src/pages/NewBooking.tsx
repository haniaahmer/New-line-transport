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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const NewBooking = () => {
  const { bookings, addBooking } = useDashboardStore();
  
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
  }, {});

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
      fare: 0,
    };
    addBooking(newBooking);
    setFormData({
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
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
            <p className="text-muted-foreground">Create and manage taxi bookings</p>
          </div>
        </div>

        {/* New Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Account Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Account*</Label>
                    <Select value={formData.account} onValueChange={(value) => setFormData((prev) => ({ ...prev, account: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add-new-account">Add new account</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="ithra">Ithra</SelectItem>
                        <SelectItem value="kimpton">KIMPTON</SelectItem>
                        <SelectItem value="intercontinentalruh">intercontinentalRuh</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="ahm-sala">Ahm sala</SelectItem>
                        <SelectItem value="demo-passenger">Demo Passenger</SelectItem>
                        <SelectItem value="misfer-aldossari">MISFER ALDOSSARI</SelectItem>
                        <SelectItem value="test-test">Test Test</SelectItem>
                        <SelectItem value="test-job">Test Job</SelectItem>
                        <SelectItem value="ali-ali">ali ali</SelectItem>
                        <SelectItem value="ali-mohamed">ali mohamed</SelectItem>
                        <SelectItem value="#####">#####</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Cost Center</Label>
                    <Input value={formData.costCenter} name="costCenter" onChange={handleInputChange} className="w-full" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Invoice Ref</Label>
                    <Input value={formData.invoiceRef} name="invoiceRef" onChange={handleInputChange} className="w-full" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Name card (override)</Label>
                    <div className="flex gap-2">
                      <Input value={formData.nameCard ? formData.nameCard.name : ''} readOnly className="flex-1" placeholder="Name card (override)" />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('namecard-upload').click()}>Browse</Button>
                      <input id="namecard-upload" type="file" hidden onChange={handleFileChange} />
                    </div>
                    <p className="text-sm text-blue-600 underline cursor-pointer mt-2">Available Namecard In Account</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Job Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Confirmed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Salesman</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Salesman" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salesman1">Salesman 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Vehicle Category*</Label>
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
                    <Label className="text-sm font-medium text-gray-700">Select Driver Type</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => setFormData((prev) => ({ ...prev, vehicleType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Driver Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type1">Type 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Driver</Label>
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

              {/* Booker Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-800">SELECT OR ADD BOOKER</h3>
                  <div className="flex gap-2">
                    <Button variant="link" className="text-blue-600 text-sm">+ Preset Booker</Button>
                    <Button variant="link" className="text-blue-600 text-sm">+ Quick Add</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Preset Booker</Label>
                    <Select value={formData.booker} onValueChange={(value) => setFormData((prev) => ({ ...prev, booker: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bookers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booker1">Booker 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-fit text-blue-600 border-blue-600">+ Additional Booker</Button>
                </div>
              </div>

              {/* Passenger Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-800">SELECT OR ADD PASSENGER</h3>
                  <div className="flex gap-2">
                    <Button variant="link" className="text-blue-600 text-sm">+ Preset Passenger</Button>
                    <Button variant="link" className="text-blue-600 text-sm">+ Quick Add</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Select Preset Passenger*</Label>
                    <Select value={formData.passenger} onValueChange={(value) => setFormData((prev) => ({ ...prev, passenger: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Passenger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passenger1">Passenger 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-fit text-blue-600 border-blue-600">+ Additional Passenger</Button>
                </div>
              </div>

              {/* Journey Details */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-800">JOURNEY DETAILS</h3>
                  <Select value={formData.journeyType} onValueChange={(value) => setFormData((prev) => ({ ...prev, journeyType: value }))}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Transfer (One Way)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-way">Transfer (One Way)</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Pick-Up Date (dd/mm/yyyy)*</Label>
                    <Input type="date" name="pickUpDate" value={formData.pickUpDate} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Pick-Up Time (HH:mm)*</Label>
                    <Input type="time" name="pickUpTime" value={formData.pickUpTime} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Pick Up*</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input name="pickUp" value={formData.pickUp} onChange={handleInputChange} className="pl-10" />
                    </div>
                  </div>
                  <Button variant="link" className="text-blue-600 text-sm w-fit">+ Add Via</Button>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Drop Off*</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input name="dropOff" value={formData.dropOff} onChange={handleInputChange} className="pl-10" />
                    </div>
                  </div>
                </div>

                {/* Passenger Count Section */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Passenger 👤</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(0, prev.passengers - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.passengers}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, passengers: prev.passengers + 1 }))}>+</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Big Luggage 🧳</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, bigLuggage: Math.max(0, prev.bigLuggage - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.bigLuggage}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, bigLuggage: prev.bigLuggage + 1 }))}>+</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Small Luggage 👜</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, smallLuggage: Math.max(0, prev.smallLuggage - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.smallLuggage}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, smallLuggage: prev.smallLuggage + 1 }))}>+</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Baby 🍼</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, baby: Math.max(0, prev.baby - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.baby}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, baby: prev.baby + 1 }))}>+</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Child 👶</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, child: Math.max(0, prev.child - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.child}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, child: prev.child + 1 }))}>+</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Booster 🚗</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, booster: Math.max(0, prev.booster - 1) }))}>-</Button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{formData.booster}</span>
                      <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, booster: prev.booster + 1 }))}>+</Button>
                    </div>
                  </div>
                </div>

                {/* Note Section */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-700">Note</Label>
                  <Input value={formData.note} name="note" onChange={handleInputChange} className="w-full" placeholder="Additional notes" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={handleSubmit}>
                  Create Booking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        

        {/* Bookings Table */}
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

export default NewBooking;