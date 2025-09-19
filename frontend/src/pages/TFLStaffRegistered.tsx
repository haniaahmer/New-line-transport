import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight,Plus } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { debounce } from 'lodash';

// Type definition for a record
interface TFLStaffRecord {
  bookingId: string;
  fullName: string;
  dob: string;
  dbsRefNo: string;
  dbsLastCheckDate: string;
  designation: string;
  type: string;
  dateTime: string;
}

const tflStaffRecords: TFLStaffRecord[] = [
  { bookingId: '001', fullName: 'John Doe', dob: '1990-01-15', dbsRefNo: 'DBS123', dbsLastCheckDate: '2025-09-15', designation: 'Driver', type: 'Full-time', dateTime: '2025-09-16 12:00' },
  { bookingId: '002', fullName: 'Jane Smith', dob: '1985-03-20', dbsRefNo: 'DBS124', dbsLastCheckDate: '2025-09-14', designation: 'Supervisor', type: 'Part-time', dateTime: '2025-09-15 14:30' },
];



const columnHelper = createColumnHelper<TFLStaffRecord>();

const columns = [
  columnHelper.accessor('bookingId', {
    header: 'Booking Id',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('fullName', {
    header: 'Full Name',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dob', {
    header: 'DOB',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dbsRefNo', {
    header: 'DBS Ref No',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dbsLastCheckDate', {
    header: 'DBS Last check date',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('designation', {
    header: 'Designation',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dateTime', {
    header: 'Date & Time',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
];

const TFLStaffRegistered: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const debouncedSetSearchTerm = useMemo(() => debounce(setSearchTerm, 300), []);

  const filteredRecords = useMemo(
    () =>
      tflStaffRecords.filter((record) => {
        const matchesSearch = Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = statusFilter === 'All' || record.dbsLastCheckDate === statusFilter; // Placeholder status logic
        return matchesSearch && matchesStatus;
      }),
    [searchTerm, statusFilter]
  );

  const table = useReactTable({
    data: filteredRecords,
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
    table.setPageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">TFL Staff Registered</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track registered TFL staff</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Staff
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
                  placeholder="Search staff..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    debouncedSetSearchTerm(e.target.value);
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
                <option value="2025-09-15">Checked (2025-09-15)</option>
                <option value="2025-09-14">Checked (2025-09-14)</option>
              </select>
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Staff List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredRecords.length
                  )} of {filteredRecords.length} staff
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
                            header.id === 'bookingId' ? 'min-w-[100px]' :
                            header.id === 'fullName' ? 'min-w-[150px]' :
                            header.id === 'dob' ? 'min-w-[120px]' :
                            header.id === 'dbsRefNo' ? 'min-w-[120px]' :
                            header.id === 'dbsLastCheckDate' ? 'min-w-[150px]' :
                            header.id === 'designation' ? 'min-w-[120px]' :
                            header.id === 'type' ? 'min-w-[100px]' :
                            header.id === 'dateTime' ? 'min-w-[150px]' : ''
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

export default TFLStaffRegistered;