import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Truck, DollarSign, Calendar, CheckCircle, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DriverPaymentSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const payments = [
    { 
      id: 1, 
      driverName: 'Ahmed Hassan', 
      driverId: 'DRV001',
      totalAmount: 'SR 2,450.00',
      paidAmount: 'SR 2,450.00',
      pendingAmount: 'SR 0.00',
      paymentMethod: 'Bank Transfer',
      paymentDate: '15/09/2025',
      status: 'Paid',
      jobsCompleted: 12
    },
    { 
      id: 2, 
      driverName: 'Mohammed Ali', 
      driverId: 'DRV002',
      totalAmount: 'SR 1,850.00',
      paidAmount: 'SR 1,200.00',
      pendingAmount: 'SR 650.00',
      paymentMethod: 'Cash',
      paymentDate: '14/09/2025',
      status: 'Partial',
      jobsCompleted: 8
    },
    { 
      id: 3, 
      driverName: 'Omar Abdullah', 
      driverId: 'DRV003',
      totalAmount: 'SR 3,200.00',
      paidAmount: 'SR 0.00',
      pendingAmount: 'SR 3,200.00',
      paymentMethod: 'Bank Transfer',
      paymentDate: '',
      status: 'Pending',
      jobsCompleted: 15
    },
    { 
      id: 4, 
      driverName: 'Khalid Bin Rashid', 
      driverId: 'DRV004',
      totalAmount: 'SR 2,100.00',
      paidAmount: 'SR 2,100.00',
      pendingAmount: 'SR 0.00',
      paymentMethod: 'Bank Transfer',
      paymentDate: '13/09/2025',
      status: 'Paid',
      jobsCompleted: 9
    },
    { 
      id: 5, 
      driverName: 'Fahad Al-Malki', 
      driverId: 'DRV005',
      totalAmount: 'SR 1,750.00',
      paidAmount: 'SR 875.00',
      pendingAmount: 'SR 875.00',
      paymentMethod: 'Cash',
      paymentDate: '12/09/2025',
      status: 'Partial',
      jobsCompleted: 7
    }
  ];

 

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Paid': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Partial': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
        {status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        method === 'Bank Transfer'
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
          : method === 'Cash'
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      }`}
    >
      {method}
    </span>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: 'S.No#',
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('driverName', {
      header: 'Driver Name',
      cell: (info) => (
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer block">
            {info.getValue()}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {info.row.original.driverId}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('totalAmount', {
      header: 'Total Amount',
      cell: (info) => <span className="text-gray-900 dark:text-white font-semibold">{info.getValue()}</span>,
    }),
    columnHelper.accessor('paidAmount', {
      header: 'Paid Amount',
      cell: (info) => <span className="text-green-600 dark:text-green-400 font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pendingAmount', {
      header: 'Pending Amount',
      cell: (info) => (
        <span 
          className={`font-medium ${
            info.getValue() === 'SR 0.00' 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-orange-600 dark:text-orange-400'
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('paymentMethod', {
      header: 'Payment Method',
      cell: (info) => getPaymentMethodBadge(info.getValue()),
    }),
    columnHelper.accessor('paymentDate', {
      header: 'Payment Date',
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300">
          {info.getValue() || 'Not Paid'}
        </span>
      ),
    }),
    columnHelper.accessor('jobsCompleted', {
      header: 'Jobs Completed',
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
          {info.getValue()}
        </span>
      ),
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
            onClick={() => handleViewStatement(row.original.id)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
            title="View Statement"
          >
            <FileText size={16} />
          </button>
          <button
            onClick={() => handleEdit(row.original.id)}
            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-150"
            title="Edit Payment"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
            title="Delete Payment"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const matchesSearch = payment.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             payment.driverId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = paymentStatusFilter === 'All' || payment.status === paymentStatusFilter;
        const matchesMethod = paymentMethodFilter === 'All' || payment.paymentMethod === paymentMethodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
      }),
    [searchTerm, paymentStatusFilter, paymentMethodFilter]
  );

  const table = useReactTable({
    data: filteredPayments,
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
    setPaymentStatusFilter('All');
    setPaymentMethodFilter('All');
    table.setPageIndex(0);
  };

  const handleEdit = (paymentId) => {
    console.log('Edit payment:', paymentId);
  };

  const handleDelete = (paymentId) => {
    console.log('Delete payment:', paymentId);
  };

  const handleViewStatement = (paymentId) => {
    console.log('View statement for payment:', paymentId);
  };

  const handleAddPayment = () => {
    console.log('Add new payment');
  };

  const handleExportExcel = () => {
    console.log('Export Excel');
  };

  const handleSendStatement = () => {
    console.log('Send statement');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / Driver Payment Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage driver payments and view payment history</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSendStatement}
                className="bg-white hover:bg-green-600 text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-green-700 dark:hover:bg-green-800"
              >
                <FileText size={20} />
                Send Statement
              </button>
              <button
                onClick={handleAddPayment}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <Plus size={20} />
                Add Payment
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
                  placeholder="Search drivers..."
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
                value={paymentStatusFilter}
                onChange={(e) => {
                  setPaymentStatusFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentMethodFilter}
                onChange={(e) => {
                  setPaymentMethodFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Payment Methods</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Check">Check</option>
              </select>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              <Download size={18} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredPayments.length
                  )} of {filteredPayments.length} payments
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
                            header.id === 'driverName' ? 'min-w-[180px]' :
                            header.id === 'totalAmount' ? 'min-w-[120px]' :
                            header.id === 'paidAmount' ? 'min-w-[120px]' :
                            header.id === 'pendingAmount' ? 'min-w-[130px]' :
                            header.id === 'paymentMethod' ? 'min-w-[140px]' :
                            header.id === 'paymentDate' ? 'min-w-[120px]' :
                            header.id === 'jobsCompleted' ? 'min-w-[130px]' :
                            header.id === 'status' ? 'min-w-[120px]' :
                            header.id === 'actions' ? 'min-w-[120px]' : ''
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

export default DriverPaymentSummary;