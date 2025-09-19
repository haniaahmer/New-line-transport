import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Target, Phone, Mail, ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Active',
    performance: 'Good',
    totalSales: 0,
    totalLeads: 0,
    conversionRate: '0%',
    joinDate: '',
    lastActivity: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    setShowAddModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      status: 'Active',
      performance: 'Good',
      totalSales: 0,
      totalLeads: 0,
      conversionRate: '0%',
      joinDate: '',
      lastActivity: '',
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Salesman Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email Address is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone Number is required');
      return false;
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Invalid phone number format');
      return false;
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.joinDate && !dateRegex.test(formData.joinDate)) {
      setError('Join Date must be in DD/MM/YYYY format');
      return false;
    }
    if (formData.lastActivity && !dateRegex.test(formData.lastActivity)) {
      setError('Last Activity Date must be in DD/MM/YYYY format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newSalesman = {
        ...formData,
        id: Math.max(...salesmen.map(s => s.id)) + 1,
        totalSales: Number(formData.totalSales),
        totalLeads: Number(formData.totalLeads),
      };
      
      console.log('Creating new salesman:', newSalesman);
      
      handleCloseModal();
    } catch (error) {
      setError('Failed to create salesman. Please try again.');
      console.error('Error creating salesman:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
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

      {/* Fixed Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 bg-black bg-opacity-50 transition-opacity duration-300 overflow-y-auto"
          onClick={(e) => {
            // Only close when clicking the backdrop itself, not child elements
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col transform transition-all duration-300 scale-100 opacity-100 mx-4 sm:mx-6"
            onClick={(e) => {
              // Prevent clicks inside modal from bubbling up to backdrop
              e.stopPropagation();
            }}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Salesman</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new salesman entry</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="modal-form" onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Salesman Information
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter salesman name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Performance
                      </label>
                      <select
                        name="performance"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.performance}
                        onChange={handleInputChange}
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Performance Metrics
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Sales
                      </label>
                      <input
                        type="number"
                        name="totalSales"
                        placeholder="Enter total sales"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.totalSales}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Leads
                      </label>
                      <input
                        type="number"
                        name="totalLeads"
                        placeholder="Enter total leads"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.totalLeads}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Conversion Rate
                      </label>
                      <input
                        type="text"
                        name="conversionRate"
                        placeholder="Enter conversion rate (e.g., 25.0%)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.conversionRate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Date Information
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Join Date
                      </label>
                      <input
                        type="text"
                        name="joinDate"
                        placeholder="Enter join date (DD/MM/YYYY)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Activity
                      </label>
                      <input
                        type="text"
                        name="lastActivity"
                        placeholder="Enter last activity date (DD/MM/YYYY)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.lastActivity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isLoading}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium transition-colors disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="modal-form"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed hover:shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Create Salesman
                  </>
                )} 
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(209, 213, 219, 0.7) rgba(243, 244, 246, 0.5);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(209, 213, 219, 0.7);
          border-radius: 4px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.7);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.9);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </>
  );
};

export default SalesmanSummary;