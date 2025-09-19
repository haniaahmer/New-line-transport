import React, { useState, useMemo } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Clipboard, AlertTriangle, CheckCircle } from 'lucide-react';
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
interface DriverRecord {
  slNo: string;
  forename: string;
  surname: string;
  vehicleType: string;
  lastJobDate: string;
}

const driverData: DriverRecord[] = [
  { slNo: '1', forename: 'Alice', surname: 'Smith', vehicleType: 'Sedan', lastJobDate: '2025-09-15' },
  { slNo: '2', forename: 'Bob', surname: 'Johnson', vehicleType: 'SUV', lastJobDate: '2025-09-14' },
  { slNo: '3', forename: 'Carol', surname: 'Davis', vehicleType: 'Truck', lastJobDate: '2025-09-13' },
  { slNo: '4', forename: 'David', surname: 'Lee', vehicleType: 'Van', lastJobDate: '2025-09-12' },
];

const columnHelper = createColumnHelper<DriverRecord>();

const columns = [
  columnHelper.accessor('slNo', {
    header: 'Sl. No.',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('forename', {
    header: 'Forename',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('surname', {
    header: 'Surname',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('vehicleType', {
    header: 'Vehicle Type',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('lastJobDate', {
    header: 'Last Job Date',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
];

// Updated SummaryCard with colorful icons
const SummaryCard: React.FC<{
  title: string;
  value: number;
  color: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}> = ({ title, value, color, Icon }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  }[color] || 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses}`}>
          <Icon size={24} className="text-current" />
        </div>
      </div>
    </div>
  );
};



const LondonTFLWeeklyReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const debouncedSetSearchTerm = useMemo(() => debounce(setSearchTerm, 300), []);

  const filteredData = useMemo(
    () =>
      driverData.filter((record) => {
        const matchesSearch = Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesDate =
          (!fromDate || new Date(record.lastJobDate) >= new Date(fromDate)) &&
          (!toDate || new Date(record.lastJobDate) <= new Date(toDate));
        return matchesSearch && matchesDate;
      }),
    [searchTerm, fromDate, toDate]
  );

  const table = useReactTable({
    data: filteredData,
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
    setFromDate('');
    setToDate('');
    table.setPageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">London TFL Weekly Report</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track driver and vehicle records</p>
            </div>
            <button
              onClick={() => console.log('Add new record')}
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
                  placeholder="Search records..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    debouncedSetSearchTerm(e.target.value);
                    table.setPageIndex(0);
                  }}
                />
              </div>
              <input
                type="date"
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <input
                type="date"
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <button
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                onClick={() => console.log('Driver Config clicked')}
              >
                Driver Config
              </button>
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                onClick={() => console.log('Vehicle Config clicked')}
              >
                Vehicle Config
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Record List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredData.length
                  )} of {filteredData.length} records
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
                            header.id === 'slNo' ? 'min-w-[100px]' :
                            header.id === 'forename' ? 'min-w-[120px]' :
                            header.id === 'surname' ? 'min-w-[120px]' :
                            header.id === 'vehicleType' ? 'min-w-[120px]' :
                            header.id === 'lastJobDate' ? 'min-w-[150px]' : ''
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

export default LondonTFLWeeklyReport;