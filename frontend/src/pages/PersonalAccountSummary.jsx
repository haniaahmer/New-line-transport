import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, CreditCard, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const stats = [
    { title: 'Total Personal Accounts', value: accounts.length, icon: Users, color: 'blue' },
    { title: 'Active Accounts', value: accounts.filter(a => a.status === 'Active').length, icon: CreditCard, color: 'green' },
    { title: 'Accounts with Jobs', value: accounts.filter(a => a.lastJobDate !== 'No Jobs').length, icon: Calendar, color: 'purple' },
    { title: 'Different Payment Types', value: new Set(accounts.map(a => a.paymentType)).size, icon: User, color: 'orange' }
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

  const getPaymentTypeBadge = (paymentType) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300`}
    >
      {paymentType}
    </span>
  );

  const getLastJobDateBadge = (date) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
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
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('homeAddress', {
      header: 'Home Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('paymentType', {
      header: 'Payment Type',
      cell: (info) => getPaymentTypeBadge(info.getValue()),
    }),
    columnHelper.accessor('creditLimit', {
      header: 'Credit Limit',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('salesman', {
      header: 'Salesman',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
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
    console.log('Add new account');
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
                <p className="text-gray-600 dark:text-gray-400 mt-1">
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
                            header.id === 'homeAddress' ? 'min-w-[150px]' :
                            header.id === 'email' ? 'min-w-[150px]' :
                            header.id === 'paymentType' ? 'min-w-[120px]' :
                            header.id === 'creditLimit' ? 'min-w-[120px]' :
                            header.id === 'salesman' ? 'min-w-[120px]' :
                            header.id === 'lastJobDate' ? 'min-w-[120px]' :
                            header.id === 'status' ? 'min-w-[120px]' :
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

export default PersonalAccountSummary;