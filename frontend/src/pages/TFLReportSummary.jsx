import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Briefcase, Car, Calendar, User, ChevronLeft, ChevronRight, Printer, X } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const TFLReportSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('Covered by own company');
  const [monthFilter, setMonthFilter] = useState('September 2025');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const jobs = [
    {
      jobNo: 'J001',
      jobDateTime: '2025-09-16 08:30',
      passengers: 'John Smith, Jane Doe',
      pickupAddress: '123 Main St, London',
      dropoffAddress: '456 Oak Ave, Manchester',
      driverName: 'Michael Johnson',
      callSign: 'CS001',
      vehicleType: 'Sedan',
      vehicleRegNo: 'ABC123',
      company: 'Covered by own company',
      status: 'Completed'
    },
    {
      jobNo: 'J002',
      jobDateTime: '2025-09-16 10:15',
      passengers: 'Sarah Wilson',
      pickupAddress: '789 High St, Birmingham',
      dropoffAddress: '321 Park Road, Liverpool',
      driverName: 'David Brown',
      callSign: 'CS002',
      vehicleType: 'SUV',
      vehicleRegNo: 'XYZ789',
      company: 'Covered by own company',
      status: 'In Progress'
    },
    {
      jobNo: 'J003',
      jobDateTime: '2025-09-16 14:20',
      passengers: 'Robert Taylor, Emma Davis',
      pickupAddress: '555 Church St, Leeds',
      dropoffAddress: '777 Market St, Sheffield',
      driverName: 'James Wilson',
      callSign: 'CS003',
      vehicleType: 'Van',
      vehicleRegNo: 'DEF456',
      company: 'External Partner',
      status: 'Scheduled'
    },
    {
      jobNo: 'J004',
      jobDateTime: '2025-09-16 16:45',
      passengers: 'Lisa Anderson',
      pickupAddress: '999 King St, Newcastle',
      dropoffAddress: '111 Queen St, York',
      driverName: 'Thomas Moore',
      callSign: 'CS004',
      vehicleType: 'Sedan',
      vehicleRegNo: 'GHI789',
      company: 'Covered by own company',
      status: 'Cancelled'
    },
    {
      jobNo: 'J005',
      jobDateTime: '2025-09-16 18:00',
      passengers: 'Mark Thompson, Carol White',
      pickupAddress: '222 Station Rd, Bristol',
      dropoffAddress: '333 Harbor St, Portsmouth',
      driverName: 'Paul Davis',
      callSign: 'CS005',
      vehicleType: 'SUV',
      vehicleRegNo: 'JKL012',
      company: 'Covered by own company',
      status: 'Completed'
    },
    {
      jobNo: 'J006',
      jobDateTime: '2025-09-15 09:30',
      passengers: 'Helen Green',
      pickupAddress: '444 River St, Cambridge',
      dropoffAddress: '666 Hill Ave, Oxford',
      driverName: 'Andrew Clark',
      callSign: 'CS006',
      vehicleType: 'Sedan',
      vehicleRegNo: 'MNO345',
      company: 'External Partner',
      status: 'Completed'
    }
  ];

  
  const formatDateForDisplay = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Completed': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Scheduled': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Cancelled': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
        {status}
      </span>
    );
  };

  const getVehicleTypeBadge = (vehicleType) => (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
      {vehicleType}
    </span>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('jobNo', {
      header: 'JOB NO.',
      cell: (info) => <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">{info.getValue()}</span>,
    }),
    columnHelper.accessor('jobDateTime', {
      header: 'Job Date',
      cell: (info) => <span className="text-gray-900 dark:text-white">{formatDateForDisplay(info.getValue())}</span>,
    }),
    columnHelper.accessor('passengers', {
      header: 'Passenger(s)',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pickupAddress', {
      header: 'Pickup Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('dropoffAddress', {
      header: 'Drop off Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('driverName', {
      header: 'Driver Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('callSign', {
      header: 'Call Sign#',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('vehicleType', {
      header: 'Veh.Type',
      cell: (info) => getVehicleTypeBadge(info.getValue()),
    }),
    columnHelper.accessor('vehicleRegNo', {
      header: 'Veh. Reg No.',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original.jobNo)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.jobNo)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const matchesSearch = 
          job.jobNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.passengers.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.dropoffAddress.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCompany = companyFilter === 'All' || job.company === companyFilter;
        const jobMonth = new Date(job.jobDateTime).toLocaleString('en-US', { month: 'long', year: 'numeric' });
        const matchesMonth = monthFilter === 'All' || jobMonth === monthFilter;
        const jobDate = new Date(job.jobDateTime).toISOString().split('T')[0];
        const matchesFromDate = !fromDate || jobDate >= fromDate;
        const matchesToDate = !toDate || jobDate <= toDate;
        return matchesSearch && matchesCompany && matchesMonth && matchesFromDate && matchesToDate;
      }),
    [searchTerm, companyFilter, monthFilter, fromDate, toDate]
  );

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

  const resetFilters = () => {
    setSearchTerm('');
    setCompanyFilter('Covered by own company');
    setMonthFilter('September 2025');
    setFromDate('');
    setToDate('');
    table.setPageIndex(0);
  };

  const handleEdit = (jobNo) => {
    console.log('Edit job:', jobNo);
  };

  const handleDelete = (jobNo) => {
    console.log('Delete job:', jobNo);
  };

  const handleAddJob = () => {
    console.log('Add new job');
  };

  const handleDownloadPeriod = () => {
    console.log('Download entire period');
  };

  const handlePrintPeriod = () => {
    console.log('Print entire period');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Job Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Track and manage all transportation jobs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPeriod}
                className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Download size={18} />
                DOWNLOAD ENTIRE PERIOD
              </button>
              <button
                onClick={handlePrintPeriod}
                className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Printer size={18} />
                PRINT ENTIRE PERIOD
              </button>
            </div>
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    table.setPageIndex(0);
                  }}
                />
              </div>
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="Covered by own company">Covered by own company</option>
                <option value="External Partner">External Partner</option>
                <option value="All">All Companies</option>
              </select>
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={monthFilter}
                onChange={(e) => {
                  setMonthFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="September 2025">September 2025</option>
                <option value="August 2025">August 2025</option>
                <option value="July 2025">July 2025</option>
                <option value="All">All Months</option>
              </select>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                RESET
              </button>
            </div>
          </div>

          {/* Date Range Widget */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 mt-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Date Range</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      table.setPageIndex(0);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {fromDate && (
                    <button
                      onClick={() => {
                        setFromDate('');
                        table.setPageIndex(0);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                      table.setPageIndex(0);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {toDate && (
                    <button
                      onClick={() => {
                        setToDate('');
                        table.setPageIndex(0);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
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
              <div className="flex items-center gap-4">
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
                <button
                  onClick={handleAddJob}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                >
                  <Plus size={18} />
                  Add Job
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto hover:overflow-y-auto transition-all duration-300">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white cursor-pointer select-none min-w-[120px]"
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
    </div>
  );
};

export default TFLReportSummary;