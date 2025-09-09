import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Eye, Car, Truck, Calendar, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const FleetVehicle = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const vehicles = [
    { id: 1, category: 'luxury', type: 'BMW', regNo: '6095 SNR', keeper: '', keeperAddress: '', purchaseDate: '01/06/2025', joinDate: '01/07/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 2, category: 'sedan', type: 'Ford', regNo: '6604 RNR', keeper: '', keeperAddress: '', purchaseDate: '01/01/2025', joinDate: '01/06/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 3, category: 'sedan', type: 'Ford', regNo: '4206 LNR', keeper: '', keeperAddress: '', purchaseDate: '01/01/2025', joinDate: '01/06/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 4, category: 'luxury', type: 'Mercedes-Benz', regNo: 'EHR 9527', keeper: '', keeperAddress: '', purchaseDate: '10/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 5, category: 'VAN', type: 'Mercedes-Benz', regNo: 'JHR 9547', keeper: '', keeperAddress: '', purchaseDate: '05/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 6, category: 'SUV', type: 'GMC', regNo: '3684 ZKR', keeper: '', keeperAddress: '', purchaseDate: '05/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 7, category: 'luxury', type: 'Mercedes-Benz', regNo: '1806 ENR', keeper: '', keeperAddress: '', purchaseDate: '05/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 8, category: 'SUV', type: 'GMC', regNo: 'GGR 5747', keeper: '', keeperAddress: '', purchaseDate: '05/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
    { id: 9, category: 'luxury', type: 'Mercedes-Benz', regNo: 'TTR 6597', keeper: '', keeperAddress: '', purchaseDate: '20/02/2025', joinDate: '01/03/2025', lastJobDate: 'No Jobs', status: 'Active' },
  ];

  const stats = [
    { title: 'Total Vehicles', value: vehicles.length, icon: Car, color: 'blue' },
    { title: 'Active Vehicles', value: vehicles.filter(v => v.status === 'Active').length, icon: CheckCircle, color: 'green' },
    { title: 'Luxury Vehicles', value: vehicles.filter(v => v.category === 'luxury').length, icon: Car, color: 'purple' },
    { title: 'Available for Jobs', value: vehicles.filter(v => v.lastJobDate === 'No Jobs').length, icon: Truck, color: 'orange' },
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

  const getCategoryBadge = (category) => {
    const categoryColors = {
      luxury: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      sedan: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      SUV: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      VAN: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${categoryColors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
        {category}
      </span>
    );
  };

  const getVehicleIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'luxury':
        return <Car className="w-5 h-5" />;
      case 'suv':
        return <Truck className="w-5 h-5" />;
      case 'van':
        return <Truck className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('category', {
      header: 'Vehicle Category',
      cell: (info) => (
        <div className="flex items-center gap-2">
          {getVehicleIcon(info.getValue())}
          {getCategoryBadge(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Vehicle Type',
      cell: (info) => <span className="font-medium text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('regNo', {
      header: 'Vehicle Reg No.',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('keeper', {
      header: 'Keeper Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('keeperAddress', {
      header: 'Keeper Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('purchaseDate', {
      header: 'Vehicle Purchase Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('joinDate', {
      header: 'Company Joining Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('lastJobDate', {
      header: 'Last Job Date',
      cell: (info) => {
        const value = info.getValue();
        return (
          <span
            className={`text-sm ${
              value === 'No Jobs'
                ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {value}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'viewDetails',
      header: 'View Details',
      cell: () => (
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150">
          <Eye size={18} />
        </button>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150">
            <Edit size={16} />
          </button>
          <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        const matchesSearch =
          vehicle.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || vehicle.category === categoryFilter;
        const matchesStatus = statusFilter === 'All' || vehicle.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      }),
    [searchTerm, categoryFilter, statusFilter]
  );

  const table = useReactTable({
    data: filteredVehicles,
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
    setCategoryFilter('All');
    setStatusFilter('All');
    table.setPageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fleet Vehicle Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all fleet vehicles and their information</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105">
              <Plus size={20} />
              Add Vehicle
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
                  placeholder="Search by registration or vehicle type..."
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
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Categories</option>
                <option value="luxury">Luxury</option>
                <option value="sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="VAN">VAN</option>
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

            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vehicle List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredVehicles.length
                  )} of {filteredVehicles.length} vehicles
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
                          className={`text-left py-4 px-6 font-semibold text-gray-900 dark:text-white ${
                            header.id === 'category' ? 'min-w-[140px]' :
                            header.id === 'type' ? 'min-w-[120px]' :
                            header.id === 'regNo' ? 'min-w-[130px]' :
                            header.id === 'keeper' ? 'min-w-[120px]' :
                            header.id === 'keeperAddress' ? 'min-w-[150px]' :
                            header.id === 'purchaseDate' ? 'min-w-[150px]' :
                            header.id === 'joinDate' ? 'min-w-[150px]' :
                            header.id === 'lastJobDate' ? 'min-w-[120px]' :
                            header.id === 'viewDetails' ? 'min-w-[100px]' :
                            header.id === 'status' ? 'min-w-[80px]' :
                            header.id === 'actions' ? 'min-w-[100px]' : ''
                          } cursor-pointer select-none`}
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

export default FleetVehicle;