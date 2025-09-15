import React, { useState, useMemo } from 'react';
import { Search, Calendar, Download, Plus } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const PaymentLinkSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const paymentLinks = [
    { id: 1, srNo: '1', accountName: 'Account A', customerName: 'John Doe', jobNo: 'J001', remarks: 'Initial Payment', date: '2025-09-01', net: 100, vat: 10, gross: 110, cardCharge: 5, totalAmount: 115, paid: 'Yes', payLink: 'link1' },
    { id: 2, srNo: '2', accountName: 'Account B', customerName: 'Jane Smith', jobNo: 'J002', remarks: 'Partial Payment', date: '2025-09-02', net: 200, vat: 20, gross: 220, cardCharge: 10, totalAmount: 230, paid: 'No', payLink: 'link2' },
    { id: 3, srNo: '3', accountName: 'Account C', customerName: 'Bob Johnson', jobNo: 'J003', remarks: 'Full Payment', date: '2025-09-03', net: 300, vat: 30, gross: 330, cardCharge: 15, totalAmount: 345, paid: 'Yes', payLink: 'link3' },
  ];

  const getPaidBadge = (paid) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        paid === 'Yes'
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
      }`}
    >
      {paid}
    </span>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('srNo', {
      header: 'SR.No.',
      cell: (info) => <span className="font-medium text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('customerName', {
      header: 'Customer Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('jobNo', {
      header: 'Job No.',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('remarks', {
      header: 'Remarks',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('net', {
      header: 'Net',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">${info.getValue()}</span>,
    }),
    columnHelper.accessor('vat', {
      header: 'Vat',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">${info.getValue()}</span>,
    }),
    columnHelper.accessor('gross', {
      header: 'Gross',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">${info.getValue()}</span>,
    }),
    columnHelper.accessor('cardCharge', {
      header: 'Card Charge',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">${info.getValue()}</span>,
    }),
    columnHelper.accessor('totalAmount', {
      header: 'Total Amount',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">${info.getValue()}</span>,
    }),
    columnHelper.accessor('paid', {
      header: 'Paid?',
      cell: (info) => getPaidBadge(info.getValue()),
    }),
    columnHelper.accessor('payLink', {
      header: 'Pay Link',
      cell: (info) => (
        <a href={info.getValue()} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          Pay
        </a>
      ),
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: () => (
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150">
          <Plus size={18} />
        </button>
      ),
    }),
  ];

  const filteredPayments = useMemo(
    () =>
      paymentLinks.filter((payment) => {
        const matchesSearch =
          payment.srNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.jobNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate =
          (!startDate || new Date(payment.date) >= new Date(startDate)) &&
          (!endDate || new Date(payment.date) <= new Date(endDate));
        return matchesSearch && matchesDate;
      }),
    [searchTerm, startDate, endDate]
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
    setStartDate('');
    setEndDate('');
    table.setPageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Link Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all payment links and their details</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105">
              <Plus size={20} />
              CREATE PAYMENT LINK
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
                  placeholder="Search by SR.No., Account Name, Customer Name, or Job No..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    table.setPageIndex(0);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <input
                  type="date"
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Link List</h2>
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
                          className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white cursor-pointer select-none"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkSummary; 