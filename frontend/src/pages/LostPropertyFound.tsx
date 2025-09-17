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
interface LostPropertyRecord {
  jobNumber: string;
  propertyFoundDate: string;
  bookingDate: string;
  passengerName: string;
  driverName: string;
  jobHandledBy: string;
  viewProperty: string;
  action: 'Pending' | 'Resolved' | 'In Progress';
}

const lostPropertyRecords: LostPropertyRecord[] = [
  { jobNumber: '001', propertyFoundDate: '2025-09-15', bookingDate: '2025-09-14', passengerName: 'John Doe', driverName: 'Alice Smith', jobHandledBy: 'Team A', viewProperty: 'property1.pdf', action: 'Pending' },
  { jobNumber: '002', propertyFoundDate: '2025-09-14', bookingDate: '2025-09-13', passengerName: 'Jane Smith', driverName: 'Bob Johnson', jobHandledBy: 'Team B', viewProperty: 'property2.pdf', action: 'Resolved' },
  { jobNumber: '003', propertyFoundDate: '2025-09-13', bookingDate: '2025-09-12', passengerName: 'Mike Wilson', driverName: 'Carol Davis', jobHandledBy: 'Team A', viewProperty: 'property3.pdf', action: 'In Progress' },
  { jobNumber: '004', propertyFoundDate: '2025-09-12', bookingDate: '2025-09-11', passengerName: 'Sarah Brown', driverName: 'David Lee', jobHandledBy: 'Team C', viewProperty: 'property4.pdf', action: 'Pending' },
  { jobNumber: '005', propertyFoundDate: '2025-09-11', bookingDate: '2025-09-10', passengerName: 'Tom Anderson', driverName: 'Emma White', jobHandledBy: 'Team B', viewProperty: 'property5.pdf', action: 'Resolved' },
  { jobNumber: '006', propertyFoundDate: '2025-09-10', bookingDate: '2025-09-09', passengerName: 'Lisa Garcia', driverName: 'James Miller', jobHandledBy: 'Team A', viewProperty: 'property6.pdf', action: 'Pending' },
];

// Updated SummaryCard with colorful icons
const SummaryCard: React.FC<{
  title: string;
  value: number;
  color: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}> = ({ title, value, color, Icon }) => {
  // Define color classes based on the color prop
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

// Update the stats array to use consistent color names
const stats = [
  { title: 'Total Records', value: lostPropertyRecords.length, icon: Clipboard, color: 'blue' },
  { title: 'Pending Actions', value: lostPropertyRecords.filter(r => r.action === 'Pending').length, icon: AlertTriangle, color: 'orange' },
  { title: 'Resolved Cases', value: lostPropertyRecords.filter(r => r.action === 'Resolved').length, icon: CheckCircle, color: 'green' },
  { title: 'In Progress', value: lostPropertyRecords.filter(r => r.action === 'In Progress').length, icon: Plus, color: 'purple' }
];

const columnHelper = createColumnHelper<LostPropertyRecord>();

const columns = [
  columnHelper.accessor('jobNumber', {
    header: 'Job Number',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('propertyFoundDate', {
    header: 'Property Found Date',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('bookingDate', {
    header: 'Booking Date',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('passengerName', {
    header: 'Passenger(s) Name',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('driverName', {
    header: 'Driver Name',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('jobHandledBy', {
    header: 'Job Handled By',
    cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('viewProperty', {
    header: 'View Property',
    cell: (info) => (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          console.log('Viewing property:', info.getValue());
        }}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        aria-label={`View property ${info.getValue()}`}
      >
        View
      </a>
    ),
  }),
  columnHelper.accessor('action', {
    header: 'Action',
    cell: (info) => {
      const value = info.getValue();
      const badgeClass = {
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      }[value] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`} aria-label={`Status: ${value}`}>
          {value}
        </span>
      );
    },
  }),
];

const LostPropertyFound: React.FC = () => {
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
      lostPropertyRecords.filter((record) => {
        const matchesSearch = Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = statusFilter === 'All' || record.action === statusFilter;
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lost Property/Found</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track lost property records</p>
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

        {/* Stats Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <SummaryCard key={index} title={stat.title} value={stat.value} color={stat.color} Icon={stat.icon} />
          ))}
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
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="In Progress">In Progress</option>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Record List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredRecords.length
                  )} of {filteredRecords.length} records
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
                            header.id === 'jobNumber' ? 'min-w-[100px]' :
                            header.id === 'propertyFoundDate' ? 'min-w-[150px]' :
                            header.id === 'bookingDate' ? 'min-w-[150px]' :
                            header.id === 'passengerName' ? 'min-w-[150px]' :
                            header.id === 'driverName' ? 'min-w-[120px]' :
                            header.id === 'jobHandledBy' ? 'min-w-[120px]' :
                            header.id === 'viewProperty' ? 'min-w-[120px]' :
                            header.id === 'action' ? 'min-w-[120px]' : ''
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

export default LostPropertyFound;