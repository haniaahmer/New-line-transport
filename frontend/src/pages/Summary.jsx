import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  User,
  DollarSign,
  Clock,
  MoreHorizontal,
  Plane,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  Navigation,
  CalendarDays,
  Users,
  Briefcase,
  Star,
  ArrowLeft,
  ArrowRight,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Summary = () => {
  const [selectedOwner, setSelectedOwner] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchDriver, setSearchDriver] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  // Mock data remains unchanged
  const datesSummary = [
    {
      date: 'SAT, 17/05/2025',
      daysAgo: 123,
      totalJobs: 2,
      revenue: 300.00,
      margin: 300.00,
      jobs: [
        {
          id: 'INTERFILL-96939',
          status: 'confirmed',
          priority: 'high',
          passenger: { name: 'Naeem Khan', company: 'Namecnrd', count: { adults: 0, children: 0, infants: 0 } },
          datetime: '17/05/2025 00:00',
          flightTrain: { type: 'transfer', number: 'TFR' },
          route: { from: 'The Ritz-Carlton, Riyadh', to: 'King Khalid International Airport' },
          type: 'TFR',
          driver: { name: 'Abbas Israr', phone: '+966569104457', rating: 4.8 },
          vehicle: { model: 'xxx-2025', number: '1010', type: 'sedan' },
          price: 300.00,
          margin: 300.00,
          scheduledTime: 'HA 18:04 16/05/2025',
          estimatedDuration: '45 min'
        },
        {
          id: 'INTERFILL-96938',
          status: 'in-progress',
          priority: 'urgent',
          passenger: { name: 'Haqq Alhq', company: 'Namecnrd', count: { adults: 1, children: 1, infants: 0 } },
          datetime: '17/05/2025 17:10',
          flightTrain: { type: 'flight', number: '987987', eta: '17/05/2025 17:10' },
          route: { from: 'King Khalid International Airport', to: 'As Diriyah' },
          type: 'TFR',
          driver: { name: 'Abbas Israr', phone: '+966569104457', rating: 4.8 },
          vehicle: { model: 'xxx-2025', number: '1010', type: 'sedan' },
          price: 0.00,
          margin: 0.00,
          scheduledTime: 'POB 18:00 16/05/2025',
          estimatedDuration: '35 min',
          isHighlighted: true
        }
      ]
    },
    {
      date: 'MON, 19/05/2025',
      daysAgo: 121,
      totalJobs: 1,
      revenue: 200.00,
      margin: 200.00,
      jobs: [
        {
          id: 'INTERFILL-96674',
          status: 'confirmed',
          priority: 'medium',
          passenger: { name: 'Kjkjh Jbmjh', company: 'Namecnrd', count: { adults: 2, children: 2, infants: 0 } },
          datetime: '19/05/2025 00:00',
          flightTrain: { type: 'flight', number: '3453535' },
          route: { from: 'King Khalid International Airport', to: 'The Ritz-Carlton, Riyadh' },
          type: 'TFR',
          driver: { name: 'Abbas Israr', phone: '+966569104457', rating: 4.8 },
          vehicle: { model: 'xxx 2025', number: '1010', type: 'sedan', requirement: 'Required: sedan' },
          price: 200.00,
          margin: 0.00,
          scheduledTime: 'POB 18:10 18/05/2025',
          estimatedDuration: '50 min'
        }
      ]
    }
  ];

  const currentDateData = datesSummary[currentDateIndex];
  
  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusConfig = (status) => {
    const configs = {
      'confirmed': { color: 'bg-primary text-primary-foreground', icon: CheckCircle, label: 'Confirmed' },
      'in-progress': { color: 'bg-success text-success-foreground', icon: Clock, label: 'In Progress' },
      'pending': { color: 'bg-warning text-warning-foreground', icon: AlertCircle, label: 'Pending' },
      'completed': { color: 'bg-accent text-accent-foreground', icon: CheckCircle, label: 'Completed' },
      'cancelled': { color: 'bg-destructive text-destructive-foreground', icon: XCircle, label: 'Cancelled' },
      'unallocated': { color: 'bg-muted text-muted-foreground', icon: AlertCircle, label: 'UnAllocated' },
      'allocated': { color: 'bg-primary text-primary-foreground', icon: CheckCircle, label: 'Allocated' },
      'onway': { color: 'bg-success text-success-foreground', icon: Clock, label: 'Onway' },
      'pob': { color: 'bg-warning text-warning-foreground', icon: Clock, label: 'POB' },
      'clear': { color: 'bg-destructive text-destructive-foreground', icon: XCircle, label: 'Clear' }
    };
    return configs[status.toLowerCase()] || configs['pending'];
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      'urgent': { color: 'border-l-destructive bg-destructive/10', badge: 'bg-destructive/20 text-destructive' },
      'high': { color: 'border-l-warning bg-warning/10', badge: 'bg-warning/20 text-warning' },
      'medium': { color: 'border-l-primary bg-primary/10', badge: 'bg-primary/20 text-primary' },
      'low': { color: 'border-l-muted bg-muted/10', badge: 'bg-muted/20 text-muted-foreground' }
    };
    return configs[priority] || configs['medium'];
  };

  const PassengerIcons = ({ passengers }) => (
    <div className="flex items-center gap-2">
      {passengers.adults > 0 && (
        <div className="w-7 h-7 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
          {passengers.adults}
        </div>
      )}
      {passengers.children > 0 && (
        <div className="w-7 h-7 bg-warning/20 text-warning rounded-full flex items-center justify-center text-xs font-bold">
          {passengers.children}
        </div>
      )}
      {passengers.infants > 0 && (
        <div className="w-7 h-7 bg-success/20 text-success rounded-full flex items-center justify-center text-xs font-bold">
          {passengers.infants}
        </div>
      )}
    </div>
  );

  const JobCard = ({ job, index }) => {
    const statusConfig = getStatusConfig(job.status);
    const priorityConfig = getPriorityConfig(job.priority);
    const StatusIcon = statusConfig.icon;

    return (
      <Card className={`transition-all duration-200 border-l-4 ${priorityConfig.color}`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-mono text-muted-foreground">{job.id}</span>
                <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig.label}
                </Badge>
              </div>
              <Badge variant="outline" className={priorityConfig.badge}>
                {job.priority.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                <Eye className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                <Edit className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Passenger Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm text-foreground">Passenger Details</span>
              </div>
              <div className="pl-6 space-y-2">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium w-fit">
                  {job.passenger.company}
                </div>
                <p className="font-medium text-foreground">{job.passenger.name}</p>
                <PassengerIcons passengers={job.passenger.count} />
              </div>
            </div>

            {/* Trip Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-success" />
                <span className="font-medium text-sm text-foreground">Trip Information</span>
              </div>
              <div className="pl-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">From</p>
                      <p className="text-sm text-muted-foreground">{job.route.from}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">To</p>
                      <p className="text-sm text-muted-foreground">{job.route.to}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.estimatedDuration}</span>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm text-foreground">Service Details</span>
              </div>
              <div className="pl-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{job.datetime}</span>
                  </div>
                  {job.flightTrain.type === 'flight' && (
                    <div className="bg-success/10 text-success px-3 py-1 rounded text-xs font-medium w-fit">
                      <Plane className="inline h-3 w-3 mr-1" />
                      Flight: {job.flightTrain.number}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{job.vehicle.model} - {job.vehicle.number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">
                    {job.driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{job.driver.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">{job.driver.rating}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2 hover:bg-muted">
                <Phone className="h-3 w-3 text-muted-foreground" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="gap-2 hover:bg-muted">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                Message
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Fare</p>
                <p className="text-xl font-bold text-success">{formatCurrency(job.price)}</p>
              </div>
              {job.price > 0 && (
                <Badge className="bg-success/20 text-success">
                  Paid
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Summary</h1>
            <p className="text-muted-foreground">Comprehensive overview of all transportation services</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10 border-2"
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
              />
            </div>
            <Button className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-muted">
              <Download className="h-4 w-4 text-muted-foreground" />
              Export
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-muted">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              Refresh
            </Button>
          </div>
        </div>

       
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Smart Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { icon: User, label: 'Driver', value: 'driver' },
                { icon: Car, label: 'Vehicle', value: 'vehicle' },
                { icon: CheckCircle, label: 'Status', value: 'status' },
                { icon: Users, label: 'Client', value: 'client' },
                { icon: Calendar, label: 'From Date', value: 'from' },
                { icon: Calendar, label: 'To Date', value: 'to' }
              ].map((filter) => (
                <div key={filter.value} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <filter.icon className="h-4 w-4 text-primary" />
                    {filter.label}
                  </div>
                  {filter.value === 'driver' ? (
                    <Select onValueChange={setSelectedOwner} value={selectedOwner}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select Driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        <SelectItem value="Abbas Israr">Abbas Israr</SelectItem>
                        <SelectItem value="William Kamau">William Kamau</SelectItem>
                        <SelectItem value="Hassan Nasur">Hassan Nasur</SelectItem>
                        <SelectItem value="Zein Said">Zein Said</SelectItem>
                        <SelectItem value="Mohamed Sohail">Mohamed Sohail</SelectItem>
                        <SelectItem value="Mohammed Afraasiab">Mohammed Afraasiab</SelectItem>
                        <SelectItem value="Makaja William">Makaja William</SelectItem>
                        <SelectItem value="Katongole Denis">Katongole Denis</SelectItem>
                        <SelectItem value="Kashif demo">Kashif demo</SelectItem>
                        <SelectItem value="Mamun Kamran Khan">Mamun Kamran Khan</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : filter.value === 'vehicle' ? (
                    <Select>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select Vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vehicles</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="VAN">VAN</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : filter.value === 'status' ? (
                    <Select>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="unallocated">UnAllocated</SelectItem>
                        <SelectItem value="allocated">Allocated</SelectItem>
                        <SelectItem value="onway">Onway</SelectItem>
                        <SelectItem value="pob">POB</SelectItem>
                        <SelectItem value="clear">Clear</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : filter.value === 'client' ? (
                    <Select>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients</SelectItem>
                        <SelectItem value="Namecnrd">Namecnrd</SelectItem>
                        <SelectItem value="Interfill">Interfill</SelectItem>
                        <SelectItem value="Namec">Namec</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : filter.value === 'from' || filter.value === 'to' ? (
                    <Input type="date" className="border-2" />
                  ) : (
                    <Select>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {filter.label}s</SelectItem>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="gap-2 hover:bg-muted">
                <XCircle className="h-4 w-4 text-muted-foreground" />
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Date Navigation */}
        <Card className="bg-background shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-muted"
                  onClick={() => setCurrentDateIndex(Math.max(0, currentDateIndex - 1))}
                  disabled={currentDateIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground">{currentDateData.date}</h3>
                  <p className="text-muted-foreground text-sm">{currentDateData.daysAgo} days ago • {currentDateData.totalJobs} jobs</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-muted"
                  onClick={() => setCurrentDateIndex(Math.min(datesSummary.length - 1, currentDateIndex + 1))}
                  disabled={currentDateIndex === datesSummary.length - 1}
                >
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(currentDateData.revenue)}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Margin</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(currentDateData.margin)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Display */}
        <div className="space-y-6">
          {currentDateData.jobs.length > 0 ? (
            currentDateData.jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">No jobs found</h3>
                <p className="text-muted-foreground">No transportation jobs scheduled for this date.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination for dates */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {datesSummary.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentDateIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground'
                }`}
                onClick={() => setCurrentDateIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;