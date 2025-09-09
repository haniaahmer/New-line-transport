import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Target, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const SalesmanSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [performanceFilter, setPerformanceFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const salesmen = [
    { 
      id: 1, 
      name: 'John Smith', 
      phone: '+1 (555) 123-4567', 
      email: 'john.smith@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 125000, 
      totalLeads: 45, 
      conversionRate: '27.8%',
      joinDate: '15/03/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      phone: '+1 (555) 234-5678', 
      email: 'sarah.j@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 89000, 
      totalLeads: 38, 
      conversionRate: '23.7%',
      joinDate: '22/05/2024',
      lastActivity: '01/09/2025'
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      phone: '+1 (555) 345-6789', 
      email: 'michael.chen@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 142000, 
      totalLeads: 52, 
      conversionRate: '30.2%',
      joinDate: '08/02/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 4, 
      name: 'Emily Rodriguez', 
      phone: '+1 (555) 456-7890', 
      email: 'emily.r@company.com', 
      status: 'Active', 
      performance: 'Average', 
      totalSales: 67000, 
      totalLeads: 31, 
      conversionRate: '19.4%',
      joinDate: '17/07/2024',
      lastActivity: '31/08/2025'
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      phone: '+1 (555) 567-8901', 
      email: 'david.wilson@company.com', 
      status: 'Inactive', 
      performance: 'Poor', 
      totalSales: 28000, 
      totalLeads: 25, 
      conversionRate: '12.0%',
      joinDate: '03/01/2024',
      lastActivity: '15/08/2025'
    },
    { 
      id: 6, 
      name: 'Lisa Taylor', 
      phone: '+1 (555) 678-9012', 
      email: 'lisa.t@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 95000, 
      totalLeads: 42, 
      conversionRate: '25.6%',
      joinDate: '29/04/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 7, 
      name: 'Robert Brown', 
      phone: '+1 (555) 789-0123', 
      email: 'robert.b@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 110000, 
      totalLeads: 48, 
      conversionRate: '26.9%',
      joinDate: '12/06/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 8, 
      name: 'Jennifer Lee', 
      phone: '+1 (555) 890-1234', 
      email: 'jennifer.lee@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 82000, 
      totalLeads: 36, 
      conversionRate: '22.8%',
      joinDate: '05/09/2024',
      lastActivity: '01/09/2025'
    },
    { 
      id: 9, 
      name: 'Thomas Moore', 
      phone: '+1 (555) 901-2345', 
      email: 'thomas.m@company.com', 
      status: 'Inactive', 
      performance: 'Average', 
      totalSales: 45000, 
      totalLeads: 29, 
      conversionRate: '17.2%',
      joinDate: '20/11/2024',
      lastActivity: '20/08/2025'
    },
    { 
      id: 10, 
      name: 'Amanda Clark', 
      phone: '+1 (555) 012-3456', 
      email: 'amanda.c@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 135000, 
      totalLeads: 50, 
      conversionRate: '29.5%',
      joinDate: '14/02/2024',
      lastActivity: '02/09/2025'
    }
  ];

  const stats = [
    { title: 'Total Salesmen', value: salesmen.length, icon: Users, color: 'blue' },
    { title: 'Active Salesmen', value: salesmen.filter(s => s.status === 'Active').length, icon: Target, color: 'green' },
    { title: 'Top Performers', value: salesmen.filter(s => s.performance === 'Excellent').length, icon: Target, color: 'purple' },
    { title: 'Total Sales', value: `$${salesmen.reduce((sum, s) => sum + s.totalSales, 0).toLocaleString()}`, icon: Users, color: 'orange' }
  ];

  const getStatusBadge = (status) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Active'
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      {status}
    </span>
  );

  const getPerformanceBadge = (performance) => {
    const performanceColors = {
      'Excellent': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Good': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Average': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Poor': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${performanceColors[performance]}`}>
        {performance}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Salesman Name',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone Number',
      cell: (info) => (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Phone size={16} className="text-gray-500 dark:text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email Address',
      cell: (info) => (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Mail size={16} className="text-gray-500 dark:text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.accessor('performance', {
      header: 'Performance',
      cell: (info) => getPerformanceBadge(info.getValue()),
    }),
    columnHelper.accessor('totalSales', {
      header: 'Total Sales',
      cell: (info) => <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(info.getValue())}</span>,
    }),
    columnHelper.accessor('totalLeads', {
      header: 'Total Leads',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('conversionRate', {
      header: 'Conversion Rate',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('joinDate', {
      header: 'Join Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('lastActivity', {
      header: 'Last Activity',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original.id)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredSalesmen = useMemo(
    () =>
      salesmen.filter((salesman) => {
        const matchesSearch = salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             salesman.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             salesman.phone.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || salesman.status === statusFilter;
        const matchesPerformance = performanceFilter === 'All' || salesman.performance === performanceFilter;
        return matchesSearch && matchesStatus && matchesPerformance;
      }),
    [searchTerm, statusFilter, performanceFilter]
  );

  const table = useReactTable({
    data: filteredSalesmen,
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
    setStatusFilter('All');
    setPerformanceFilter('All');
    table.setPageIndex(0);
  };

  const handleEdit = (salesmanId) => {
    console.log('Edit salesman:', salesmanId);
  };

  const handleDelete = (salesmanId) => {
    console.log('Delete salesman:', salesmanId);
  };

  const handleAddSalesman = () => {
    console.log('Add new salesman');
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / Salesman Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all sales personnel and their performance metrics</p>
            </div>
            <button
              onClick={handleAddSalesman}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Salesman
            </button>
          </div>
        </div>

        {/* Stats Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
              green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
              purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
              orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
            };
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color]}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
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
                  placeholder="Search salesmen..."
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
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={performanceFilter}
                onChange={(e) => {
                  setPerformanceFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Performance</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                Reset
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Salesman List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredSalesmen.length
                  )} of {filteredSalesmen.length} salesmen
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
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`text-left py-4 px-6 font-semibold text-gray-900 dark:text-white cursor-pointer select-none ${
                            header.id === 'id' ? 'min-w-[80px]' :
                            header.id === 'name' ? 'min-w-[150px]' :
                            header.id === 'phone' ? 'min-w-[150px]' :
                            header.id === 'email' ? 'min-w-[150px]' :
                            header.id === 'status' ? 'min-w-[120px]' :
                            header.id === 'performance' ? 'min-w-[120px]' :
                            header.id === 'totalSales' ? 'min-w-[120px]' :
                            header.id === 'totalLeads' ? 'min-w-[120px]' :
                            header.id === 'conversionRate' ? 'min-w-[120px]' :
                            header.id === 'joinDate' ? 'min-w-[120px]' :
                            header.id === 'lastActivity' ? 'min-w-[120px]' :
                            header.id === 'actions' ? 'min-w-[100px]' : ''
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

export default SalesmanSummary;