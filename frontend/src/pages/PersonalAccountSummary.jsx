import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, CreditCard, Calendar, User, ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const PersonalAccountSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    homeAddress: '',
    email: '',
    paymentType: '£0',
    creditLimit: '',
    salesman: '',
    status: 'Active'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const accounts = [
    { 
      id: 7567, 
      name: 'Alim sala', 
      homeAddress: '', 
      email: 'bin@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 6601, 
      name: 'Demo Passenger', 
      homeAddress: '', 
      email: 'nevline@gmail.com', 
      paymentType: '$0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '20/08/2025', 
      status: 'Active' 
    },
    { 
      id: 7486, 
      name: 'MISFER ALDOSSAKI', 
      homeAddress: '', 
      email: 'maldosny@hotmail.com', 
      paymentType: '0.3p', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 7646, 
      name: 'Test Job', 
      homeAddress: '', 
      email: 'tabassum.logatifie@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 8527, 
      name: 'Test Test', 
      homeAddress: '', 
      email: 'test@test.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 7424, 
      name: 'all all', 
      homeAddress: '', 
      email: '6p112211@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 8651, 
      name: 'all all', 
      homeAddress: '', 
      email: 'ar@az.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '20/08/2025', 
      status: 'Active' 
    },
    { 
      id: 8048, 
      name: 'all mohamed', 
      homeAddress: '', 
      email: 'al@mail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '12/07/2025', 
      status: 'Active' 
    },
    { 
      id: 7568, 
      name: 'iff ifff', 
      homeAddress: '', 
      email: 'mmm@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
  ];

  

  const getStatusBadge = (status) => (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        status === 'Active'
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      {status}
    </span>
  );

  const getPaymentTypeBadge = (paymentType) => (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300`}
    >
      {paymentType}
    </span>
  );

  const getLastJobDateBadge = (date) => (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        date === 'No Jobs'
          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      }`}
    >
      {date}
    </span>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: 'S.No#',
      cell: (info) => <span className="text-gray-900 dark:text-white text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer text-sm">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('homeAddress', {
      header: 'Home Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('paymentType', {
      header: 'Payment Type',
      cell: (info) => getPaymentTypeBadge(info.getValue()),
    }),
    columnHelper.accessor('creditLimit', {
      header: 'Credit Limit',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('salesman', {
      header: 'Salesman',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('lastJobDate', {
      header: 'Last Job Date',
      cell: (info) => getLastJobDateBadge(info.getValue()),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleEdit(row.original.id)}
            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-150"
            title="Edit Account"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-150"
            title="Delete Account"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredAccounts = useMemo(
    () =>
      accounts.filter((account) => {
        const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             account.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPaymentType = paymentTypeFilter === 'All' || account.paymentType === paymentTypeFilter;
        const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
        return matchesSearch && matchesPaymentType && matchesStatus;
      }),
    [searchTerm, paymentTypeFilter, statusFilter]
  );

  const table = useReactTable({
    data: filteredAccounts,
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
    setPaymentTypeFilter('All');
    setStatusFilter('All');
    table.setPageIndex(0);
  };

  const handleEdit = (accountId) => {
    console.log('Edit account:', accountId);
  };

  const handleDelete = (accountId) => {
    console.log('Delete account:', accountId);
  };

  const handleAddAccount = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      homeAddress: '',
      email: '',
      paymentType: '£0',
      creditLimit: '',
      salesman: '',
      status: 'Active'
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
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email Address is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new account to the list (in a real app, this would be an API call)
      const newAccount = {
        ...formData,
        id: Math.max(...accounts.map(a => a.id)) + 1,
        lastJobDate: 'No Jobs'
      };
      
      console.log('Creating new personal account:', newAccount);
      
      // In a real app, you would dispatch an action or make an API call here
      // accounts.push(newAccount); // Uncomment if you want to add to local state
      
      handleCloseModal();
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / Personal Account Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all personal accounts and their details</p>
            </div>
            <button
              onClick={handleAddAccount}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Account
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
                  placeholder="Search accounts..."
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
                value={paymentTypeFilter}
                onChange={(e) => {
                  setPaymentTypeFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Payment Types</option>
                <option value="£0">£0</option>
                <option value="$0">$0</option>
                <option value="0.3p">0.3p</option>
              </select>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredAccounts.length
                  )} of {filteredAccounts.length} accounts
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                          className={`text-left py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer select-none text-sm ${
                            header.id === 'id' ? 'min-w-[60px]' :
                            header.id === 'name' ? 'min-w-[120px]' :
                            header.id === 'homeAddress' ? 'min-w-[140px]' :
                            header.id === 'email' ? 'min-w-[140px]' :
                            header.id === 'paymentType' ? 'min-w-[80px]' :
                            header.id === 'creditLimit' ? 'min-w-[100px]' :
                            header.id === 'salesman' ? 'min-w-[100px]' :
                            header.id === 'lastJobDate' ? 'min-w-[100px]' :
                            header.id === 'status' ? 'min-w-[80px]' :
                            header.id === 'actions' ? 'min-w-[80px]' : ''
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
                        <td key={cell.id} className="py-3 px-4">
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
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                  !table.getCanPreviousPage()
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                  !table.getCanNextPage()
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Personal Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new personal account</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                    Basic Information
                  </h4>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      value={formData.name}
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
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Home Address
                    </label>
                    <input
                      type="text"
                      name="homeAddress"
                      placeholder="Enter home address"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      value={formData.homeAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                    Account Details
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Payment Type
                      </label>
                      <select
                        name="paymentType"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        value={formData.paymentType}
                        onChange={handleInputChange}
                      >
                        <option value="£0">£0</option>
                        <option value="$0">$0</option>
                        <option value="0.3p">0.3p</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Credit Limit
                    </label>
                    <input
                      type="text"
                      name="creditLimit"
                      placeholder="Enter credit limit"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      value={formData.creditLimit}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Salesman
                    </label>
                    <input
                      type="text"
                      name="salesman"
                      placeholder="Enter salesman name"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      value={formData.salesman}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountSummary;