import React, { useState } from 'react';
import { ArrowLeft, Download, Plus, Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const FinanceReport = () => {
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    month: 'SEPTEMBER 2025',
    client: 'Filter By Client',
    driver: 'Filter By Driver',
    vehicle: 'Filter By Vehicle'
  });

  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const jobData = [
    {
      id: 'KIMPTON112484',
      booker: 'HOTEL KIMPTON',
      passenger: 'Abu Dhaim Ayman',
      date: '02/09/2025',
      time: '16:30',
      pickup: 'KAFD, فريق السعودية',
      dropoff: 'King Khalid International Airport Saudi Arabia',
      driver: 'Ali Othman',
      vehicle: 'Toyota Camry',
      accountName: 'KIMPTON',
      cashJob: 'No',
      review: 'No',
      revenue: '0.00ر.س',
      cost: '230.00ر.س',
      vat: '0.00ر.س',
      margin: '230.00-ر.س',
      fleetShare: '0.00ر.س',
      marginPercent: '0%'
    }
  ];

  // Sample data for filter options
  const filterOptions = {
    clients: ['KIMPTON', 'Intercontinental', 'Marriott', 'Hilton'],
    drivers: ['Ali Othman', 'Mohammed Ahmed', 'Sarah Johnson', 'David Wilson'],
    vehicles: ['Toyota Camry', 'Hyundai Sonata', 'Mercedes S-Class', 'BMW 5 Series']
  };

  // Generate dates for calendar
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -30; i <= 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString('en-GB'));
    }
    return dates;
  };

  const dates = generateDates();

  const summary = {
    totalJobs: 1,
    accountName: 'KIMPTON',
    avgMarginPerJob: '230.00-ر.س/Job',
    avgMarginPercent: '0.00%/Job',
    totalRevenue: '0.00ر.س',
    totalCost: '230.00ر.س',
    totalVat: '0.00ر.س',
    totalMargin: '230.00-ر.س',
    fleetShare: '0.00ر.س',
    netMargin: '230.00-ر.س'
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDateSelect = (date, type) => {
    handleFilterChange(type, date);
    if (type === 'from') setShowFromCalendar(false);
    if (type === 'to') setShowToCalendar(false);
  };

  const clearFilters = () => {
    setFilters({
      from: '',
      to: '',
      month: 'SEPTEMBER 2025',
      client: 'Filter By Client',
      driver: 'Filter By Driver',
      vehicle: 'Filter By Vehicle'
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(jobData.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FINANCE REPORT</h1>
            <p className="text-gray-600">Manage and track financial metrics and job activities</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200">
              <Download size={18} />
              EXPORT CSV
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg">
              <Plus size={20} />
              ADD NEW JOB
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              
              {/* From Date with Calendar */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Choose From"
                    value={filters.from}
                    onChange={(e) => handleFilterChange('from', e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    onFocus={() => setShowFromCalendar(true)}
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                    size={20} 
                    onClick={() => setShowFromCalendar(!showFromCalendar)}
                  />
                </div>
                {showFromCalendar && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleDateSelect(date, 'from')}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* To Date with Calendar */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Choose To"
                    value={filters.to}
                    onChange={(e) => handleFilterChange('to', e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    onFocus={() => setShowToCalendar(true)}
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                    size={20} 
                    onClick={() => setShowToCalendar(!showToCalendar)}
                  />
                </div>
                {showToCalendar && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleDateSelect(date, 'to')}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <select
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>SEPTEMBER 2025</option>
                <option>AUGUST 2025</option>
                <option>JULY 2025</option>
                <option>JUNE 2025</option>
                <option>MAY 2025</option>
              </select>

              {/* Client Filter */}
              <select
                value={filters.client}
                onChange={(e) => handleFilterChange('client', e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter By Client</option>
                {filterOptions.clients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>

              {/* Driver Filter */}
              <select
                value={filters.driver}
                onChange={(e) => handleFilterChange('driver', e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter By Driver</option>
                {filterOptions.drivers.map(driver => (
                  <option key={driver} value={driver}>{driver}</option>
                ))}
              </select>

              {/* Vehicle Filter */}
              <select
                value={filters.vehicle}
                onChange={(e) => handleFilterChange('vehicle', e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter By Vehicle</option>
                {filterOptions.vehicles.map(vehicle => (
                  <option key={vehicle} value={vehicle}>{vehicle}</option>
                ))}
              </select>

              <button 
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                onClick={clearFilters}
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">#</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Job</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Booker</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Passenger</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Time</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Pickup</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Dropoff</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Driver</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Vehicle</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Account Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Revenue</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Cost</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Margin</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Margin %</th>
                </tr>
              </thead>
              <tbody>
                {jobData.map((job, index) => (
                  <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">
                      <span className="text-blue-600 font-medium">{job.id}</span>
                    </td>
                    <td className="py-4 px-6">{job.booker}</td>
                    <td className="py-4 px-6">{job.passenger}</td>
                    <td className="py-4 px-6">{job.date}</td>
                    <td className="py-4 px-6">{job.time}</td>
                    <td className="py-4 px-6 text-sm max-w-xs truncate">{job.pickup}</td>
                    <td className="py-4 px-6 text-sm max-w-xs truncate">{job.dropoff}</td>
                    <td className="py-4 px-6">{job.driver}</td>
                    <td className="py-4 px-6">{job.vehicle}</td>
                    <td className="py-4 px-6">
                      <span className="text-blue-600 font-medium">{job.accountName}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-orange-600 font-medium">{job.revenue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-red-600 font-medium">{job.cost}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-cyan-600 font-medium">{job.margin}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.marginPercent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Row */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="font-medium">
                <span className="text-gray-700">{summary.totalJobs} job for {summary.accountName}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 w-4 h-4 rounded"></div>
                  <span className="text-orange-600 font-medium">{summary.totalRevenue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 w-4 h-4 rounded"></div>
                  <span className="text-red-600 font-medium">{summary.totalCost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-cyan-500 w-4 h-4 rounded"></div>
                  <span className="text-cyan-600 font-medium">{summary.totalMargin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 w-4 h-4 rounded"></div>
                  <span className="text-green-600 font-medium">{jobData[0].marginPercent}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-end text-sm text-gray-600">
              <span>Ave. Margin {summary.avgMarginPerJob} | Ave. Margin {summary.avgMarginPercent}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-orange-600 font-medium">Total Revenue(ر.س)</span>
                <span className="text-orange-600 font-bold text-lg">{summary.totalRevenue}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center py-2">
                <span className="text-red-600 font-medium">Total Cost(ر.س)</span>
                <span className="text-red-600 font-bold text-lg">{summary.totalCost}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center py-2">
                <span className="text-blue-600 font-medium">Total Vat(ر.س)</span>
                <span className="text-blue-600 font-bold text-lg">{summary.totalVat}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center py-2">
                <span className="text-cyan-600 font-medium">Total Margin(ر.س)</span>
                <span className="text-cyan-600 font-bold text-lg">{summary.totalMargin}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium">Total Jobs</span>
                <span className="font-bold text-lg">{summary.totalJobs}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center py-2">
                <span className="text-purple-600 font-medium">Fleet Share(ر.س)</span>
                <span className="text-purple-600 font-bold text-lg">{summary.fleetShare}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center py-2">
                <span className="text-red-600 font-medium">Net Margin(ر.س)</span>
                <span className="text-red-600 font-bold text-lg">{summary.netMargin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-gray-600">
            Showing {jobData.length} of {jobData.length} jobs
          </div>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled: cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(jobData.length / itemsPerPage)}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;