import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const FinanceReport = () => {
  const [filters, setFilters] = useState({
    search: '',
    from: '',
    to: '',
    month: 'September 2025',
    client: 'All Clients',
    driver: 'All Drivers',
    vehicle: 'All Vehicles',
  });
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const jobData = [
    {
      id: 'KIMPTON112484',
      booker: 'HOTEL KIMPTON',
      passenger: 'Abu Dhaim Ayman',
      date: '09/02/2025',
      time: '16:30',
      pickup: 'KAFD, Saudi Team',
      dropoff: 'King Khalid International Airport, Saudi Arabia',
      driver: 'Ali Othman',
      vehicle: 'Toyota Camry',
      accountName: 'KIMPTON',
      cashJob: 'No',
      review: 'No',
      revenue: 0.00,
      cost: 230.00,
      vat: 0.00,
      margin: -230.00,
      fleetShare: 0.00,
      marginPercent: '0%',
    },
  ];

  const filterOptions = {
    clients: ['All Clients', 'KIMPTON', 'Intercontinental', 'Marriott', 'Hilton'],
    drivers: ['All Drivers', 'Ali Othman', 'Mohammed Ahmed', 'Sarah Johnson', 'David Wilson'],
    vehicles: ['All Vehicles', 'Toyota Camry', 'Hyundai Sonata', 'Mercedes S-Class', 'BMW 5 Series'],
  };

  const months = [
    'January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025',
    'June 2025', 'July 2025', 'August 2025', 'September 2025', 'October 2025',
    'November 2025', 'December 2025',
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -30; i <= 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    }
    return dates;
  };

  const dates = generateDates();

  const summary = {
    totalJobs: jobData.length,
    accountName: 'KIMPTON',
    avgMarginPerJob: jobData.length ? `$${(-230.00 / jobData.length).toFixed(2)}/Job` : '$0.00/Job',
    avgMarginPercent: jobData.length ? `${(0).toFixed(2)}%/Job` : '0.00%/Job',
    totalRevenue: `$${jobData.reduce((sum, job) => sum + job.revenue, 0).toFixed(2)}`,
    totalCost: `$${jobData.reduce((sum, job) => sum + job.cost, 0).toFixed(2)}`,
    totalVat: `$${jobData.reduce((sum, job) => sum + job.vat, 0).toFixed(2)}`,
    totalMargin: `$${jobData.reduce((sum, job) => sum + job.margin, 0).toFixed(2)}`,
    fleetShare: `$${jobData.reduce((sum, job) => sum + job.fleetShare, 0).toFixed(2)}`,
    netMargin: `$${jobData.reduce((sum, job) => sum + job.margin, 0).toFixed(2)}`,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    table.setPageIndex(0);
  };

  const handleDateSelect = (date, type) => {
    handleFilterChange(type, date);
    if (type === 'from') setShowFromCalendar(false);
    if (type === 'to') setShowToCalendar(false);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      from: '',
      to: '',
      month: 'September 2025',
      client: 'All Clients',
      driver: 'All Drivers',
      vehicle: 'All Vehicles',
    });
    table.setPageIndex(0);
  };

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const matchesSearch = job.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.booker.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.passenger.toLowerCase().includes(filters.search.toLowerCase());
      const matchesClient = filters.client === 'All Clients' || job.accountName === filters.client;
      const matchesDriver = filters.driver === 'All Drivers' || job.driver === filters.driver;
      const matchesVehicle = filters.vehicle === 'All Vehicles' || job.vehicle === filters.vehicle;
      const matchesMonth = filters.month === 'September 2025' || job.date.includes(filters.month.split(' ')[0]);
      const matchesDateRange = (!filters.from || new Date(job.date) >= new Date(filters.from)) &&
                              (!filters.to || new Date(job.date) <= new Date(filters.to));
      return matchesSearch && matchesClient && matchesDriver && matchesVehicle && matchesMonth && matchesDateRange;
    });
  }, [filters]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: '#',
      cell: (info) => <span className="text-blue-600 dark:text-blue-400 font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('booker', {
      header: 'Booker',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('passenger', {
      header: 'Passenger',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pickup', {
      header: 'Pickup',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm max-w-xs truncate">{info.getValue()}</span>,
    }),
    columnHelper.accessor('dropoff', {
      header: 'Dropoff',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm max-w-xs truncate">{info.getValue()}</span>,
    }),
    columnHelper.accessor('driver', {
      header: 'Driver',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('vehicle', {
      header: 'Vehicle',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: (info) => <span className="text-blue-600 dark:text-blue-400 font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('revenue', {
      header: 'Revenue',
      cell: (info) => <span className="text-orange-600 dark:text-orange-400 font-medium">{formatCurrency(info.getValue())}</span>,
    }),
    columnHelper.accessor('cost', {
      header: 'Cost',
      cell: (info) => <span className="text-red-600 dark:text-red-400 font-medium">{formatCurrency(info.getValue())}</span>,
    }),
    columnHelper.accessor('margin', {
      header: 'Margin',
      cell: (info) => <span className="text-cyan-600 dark:text-cyan-400 font-medium">{formatCurrency(info.getValue())}</span>,
    }),
    columnHelper.accessor('marginPercent', {
      header: 'Margin %',
      cell: (info) => (
        <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredJobs,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  const handleAddJob = () => {
    console.log('Add new job');
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Finance Report</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track financial metrics and job activities</p>
            </div>
            <button
              onClick={handleAddJob}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Job
            </button>
          </div>
        </div>

        {/* Filters Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1 min-w-0">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="From Date"
                    value={filters.from}
                    onChange={(e) => handleFilterChange('from', e.target.value)}
                    className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    onFocus={() => setShowFromCalendar(true)}
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 cursor-pointer"
                    size={20}
                    onClick={() => setShowFromCalendar(!showFromCalendar)}
                  />
                </div>
                {showFromCalendar && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer text-gray-900 dark:text-white"
                        onClick={() => handleDateSelect(date, 'from')}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="To Date"
                    value={filters.to}
                    onChange={(e) => handleFilterChange('to', e.target.value)}
                    className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    onFocus={() => setShowToCalendar(true)}
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 cursor-pointer"
                    size={20}
                    onClick={() => setShowToCalendar(!showToCalendar)}
                  />
                </div>
                {showToCalendar && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer text-gray-900 dark:text-white"
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
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={filters.client}
                onChange={(e) => handleFilterChange('client', e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {filterOptions.clients.map((client) => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
              <select
                value={filters.driver}
                onChange={(e) => handleFilterChange('driver', e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {filterOptions.drivers.map((driver) => (
                  <option key={driver} value={driver}>{driver}</option>
                ))}
              </select>
              <select
                value={filters.vehicle}
                onChange={(e) => handleFilterChange('vehicle', e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {filterOptions.vehicles.map((vehicle) => (
                  <option key={vehicle} value={vehicle}>{vehicle}</option>
                ))}
              </select>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Job List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredJobs.length
                  )} of {filteredJobs.length} jobs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto hover:overflow-y-auto transition-all duration-300">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`text-left py-4 px-6 font-semibold text-gray-900 dark:text-white cursor-pointer select-none ${
                            header.id === 'id' ? 'min-w-[120px]' :
                            header.id === 'booker' ? 'min-w-[150px]' :
                            header.id === 'passenger' ? 'min-w-[150px]' :
                            header.id === 'date' ? 'min-w-[120px]' :
                            header.id === 'time' ? 'min-w-[100px]' :
                            header.id === 'pickup' ? 'min-w-[200px]' :
                            header.id === 'dropoff' ? 'min-w-[200px]' :
                            header.id === 'driver' ? 'min-w-[150px]' :
                            header.id === 'vehicle' ? 'min-w-[150px]' :
                            header.id === 'accountName' ? 'min-w-[150px]' :
                            header.id === 'revenue' ? 'min-w-[120px]' :
                            header.id === 'cost' ? 'min-w-[120px]' :
                            header.id === 'margin' ? 'min-w-[120px]' :
                            header.id === 'marginPercent' ? 'min-w-[120px]' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: ' ↑',
                              desc: ' ↓',
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-4 px-6">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-700 dark:text-gray-300">
                <span>{summary.totalJobs} job{summary.totalJobs !== 1 ? 's' : ''} for {summary.accountName}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 w-4 h-4 rounded"></div>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">{summary.totalRevenue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 w-4 h-4 rounded"></div>
                  <span className="text-red-600 dark:text-red-400 font-medium">{summary.totalCost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-cyan-500 w-4 h-4 rounded"></div>
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">{summary.totalMargin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 w-4 h-4 rounded"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium">{jobData[0].marginPercent}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-end text-sm text-gray-600 dark:text-gray-400">
              <span>Average Margin: {summary.avgMarginPerJob} | Average Margin: {summary.avgMarginPercent}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Financial Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Revenue</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">{summary.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Cost</span>
                <span className="text-red-600 dark:text-red-400 font-bold text-lg">{summary.totalCost}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total VAT</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{summary.totalVat}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Margin</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">{summary.totalMargin}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Jobs</span>
                <span className="text-gray-900 dark:text-white font-bold text-lg">{summary.totalJobs}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Fleet Share</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">{summary.fleetShare}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Net Margin</span>
                <span className="text-red-600 dark:text-red-400 font-bold text-lg">{summary.netMargin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                !table.getCanPreviousPage()
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                !table.getCanNextPage()
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;