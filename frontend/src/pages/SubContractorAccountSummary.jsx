import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Building, 
  X, 
  Check, 
  AlertCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const SubContractorAccountSummary = () => {
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
    account: '',
    officeAddress: '',
    accountPayableContact: '',
    emailAddress: '',
    cnpjNumber: '',
    salesman: '',
    paymentType: 'Credit',
    status: 'Active'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const accounts = [
    { id: 1, account: 'DENO PARTNER', officeAddress: '123 London St, London', accountPayableContact: 'Jane Doe', emailAddress: 'jane@denopartner.com', cnpjNumber: 'PJ-2024-001', salesman: 'Mike S', paymentType: 'Credit', lastJobDate: '2025-09-05', status: 'Active' },
    { id: 2, account: 'ABC CONTRACTORS', officeAddress: '456 Manchester Rd, Manchester', accountPayableContact: 'John Smith', emailAddress: 'john@abccontractors.com', cnpjNumber: 'PJ-2024-002', salesman: 'Sarah L', paymentType: 'Cash', lastJobDate: '2025-09-04', status: 'Active' },
    { id: 3, account: 'XYZ SERVICES', officeAddress: '789 Birmingham Ave, Birmingham', accountPayableContact: 'Alice Brown', emailAddress: 'alice@xyzservices.com', cnpjNumber: 'PJ-2024-003', salesman: 'Tom R', paymentType: 'Credit', lastJobDate: '2025-09-03', status: 'Inactive' },
    { id: 4, account: 'GLOBAL BUILDERS', officeAddress: '101 Edinburgh St, Edinburgh', accountPayableContact: 'Bob Johnson', emailAddress: 'bob@globalbuilders.com', cnpjNumber: 'PJ-2024-004', salesman: 'Emma W', paymentType: 'Credit', lastJobDate: '2025-09-02', status: 'Active' },
    { id: 5, account: 'QUALITY CONSTRUCTION', officeAddress: '202 Glasgow Ln, Glasgow', accountPayableContact: 'Carol White', emailAddress: 'carol@qualityconstruction.com', cnpjNumber: 'PJ-2024-005', salesman: 'James K', paymentType: 'Cash', lastJobDate: '2025-09-01', status: 'Active' },
    { id: 6, account: 'ELITE DEVELOPERS', officeAddress: '303 Liverpool Rd, Liverpool', accountPayableContact: 'David Lee', emailAddress: 'david@elitedevelopers.com', cnpjNumber: 'PJ-2024-006', salesman: 'Lisa P', paymentType: 'Credit', lastJobDate: '2025-08-31', status: 'Active' },
    { id: 7, account: 'PRIME CONTRACTORS', officeAddress: '404 Cardiff St, Cardiff', accountPayableContact: 'Emma Taylor', emailAddress: 'emma@primecontractors.com', cnpjNumber: 'PJ-2024-007', salesman: 'Mark T', paymentType: 'Cash', lastJobDate: '2025-08-30', status: 'Inactive' },
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
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        paymentType === 'Credit'
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      }`}
    >
      {paymentType || '-'}
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

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'S.NO#',
      cell: (info) => <span className="text-gray-900 dark:text-white text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('account', {
      header: 'Account',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer text-sm">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('officeAddress', {
      header: 'Office Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('accountPayableContact', {
      header: 'Account Payable Contact',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('emailAddress', {
      header: 'Email Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('cnpjNumber', {
      header: 'CNPJ Number',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('salesman', {
      header: 'Salesman',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300 text-sm">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('paymentType', {
      header: 'Payment Type',
      cell: (info) => getPaymentTypeBadge(info.getValue()),
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
  ], []);

  const filteredAccounts = useMemo(
    () =>
      accounts.filter((account) => {
        const matchesSearch = account.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             account.officeAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             account.accountPayableContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             account.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             account.salesman.toLowerCase().includes(searchTerm.toLowerCase());
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
    // TODO: Implement edit functionality
  };

  const handleDelete = (accountId) => {
    console.log('Delete account:', accountId);
    // TODO: Implement delete functionality
  };

  const handleAddAccount = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      account: '',
      officeAddress: '',
      accountPayableContact: '',
      emailAddress: '',
      cnpjNumber: '',
      salesman: '',
      paymentType: 'Credit',
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
    if (!formData.account.trim()) {
      setError('Account is required');
      return false;
    }
    if (!formData.emailAddress.trim()) {
      setError('Email Address is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailAddress && !emailRegex.test(formData.emailAddress)) {
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
      
      console.log('Creating new sub-contractor account:', newAccount);
      
      // In a real app, you would dispatch an action or make an API call here
      // accounts.push(newAccount);
      
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
    // TODO: Implement CSV export functionality
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header Container */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / Sub-Contractor Account Summary</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage all sub-contractor accounts and their details</p>
              </div>
              <button
                onClick={handleAddAccount}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <Plus size={20} />
                Add New
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
                    placeholder="Search sub-contractors..."
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
                  <option value="Credit">Credit</option>
                  <option value="Cash">Cash</option>
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sub-Contractor Accounts</h2>
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
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={`text-left py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer select-none text-sm ${
                              header.id === 'id' ? 'min-w-[60px]' :
                              header.id === 'account' ? 'min-w-[120px]' :
                              header.id === 'officeAddress' ? 'min-w-[140px]' :
                              header.id === 'accountPayableContact' ? 'min-w-[140px]' :
                              header.id === 'emailAddress' ? 'min-w-[140px]' :
                              header.id === 'cnpjNumber' ? 'min-w-[120px]' :
                              header.id === 'salesman' ? 'min-w-[100px]' :
                              header.id === 'paymentType' ? 'min-w-[80px]' :
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
      </div>

      {/* Enhanced Add Account Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 bg-black bg-opacity-50 transition-opacity duration-300 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg min-h-[600px] flex flex-col transform transition-all duration-300 scale-100 opacity-100 mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Sub-Contractor Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new sub-contractor account</p>
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

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Basic Information
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account *
                      </label>
                      <input
                        type="text"
                        name="account"
                        placeholder="Enter account name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.account}
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
                        name="emailAddress"
                        placeholder="Enter email address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Office Address
                      </label>
                      <input
                        type="text"
                        name="officeAddress"
                        placeholder="Enter office address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.officeAddress}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account Payable Contact
                      </label>
                      <input
                        type="text"
                        name="accountPayableContact"
                        placeholder="Enter contact name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.accountPayableContact}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CNPJ Number
                      </label>
                      <input
                        type="text"
                        name="cnpjNumber"
                        placeholder="Enter CNPJ number"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.cnpjNumber}
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
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                          value={formData.paymentType}
                          onChange={handleInputChange}
                        >
                          <option value="Credit">Credit</option>
                          <option value="Cash">Cash</option>
                        </select>
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
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Salesman
                      </label>
                      <input
                        type="text"
                        name="salesman"
                        placeholder="Enter salesman name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.salesman}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
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
                    Create Account
                  </>
                )} 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
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
      `}</style>
    </>
  );
};

export default SubContractorAccountSummary;