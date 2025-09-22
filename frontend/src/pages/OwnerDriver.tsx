import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Car, X, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';

interface Driver {
  id: number;
  name: string;
  grade: string;
  status: string;
  address: string;
  joinDate: string;
  activeVehicles: number;
  lastJobDate: string | null;
  holdBlockDate: string | null;
}

interface FormData {
  name: string;
  grade: string;
  status: string;
  address: string;
  joinDate: string;
  activeVehicles: number;
}

const OwnerDriver: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    grade: 'Standard',
    status: 'Active',
    address: '',
    joinDate: '',
    activeVehicles: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const drivers: Driver[] = [
    {
      id: 1,
      name: 'Demo Hitik',
      grade: 'Standard',
      status: 'Active',
      address: '1234',
      joinDate: '01/03/2024',
      activeVehicles: 1,
      lastJobDate: '20/06/2025',
      holdBlockDate: null,
    },
  ];

  const getStatusBadge = (status: string) => (
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

  const getGradeBadge = (grade: string) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        grade === 'VIP'
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      }`}
    >
      {grade}
    </span>
  );

  const columnHelper = createColumnHelper<Driver>();

  const columns = useMemo<ColumnDef<Driver, any>[]>(() => [
    columnHelper.accessor('id', {
      header: 'Sl.No.',
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
      minSize: 80,
    }),
    columnHelper.accessor('name', {
      header: "Driver's Name",
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
      minSize: 150,
    }),
    columnHelper.accessor('grade', {
      header: 'Grade',
      cell: (info) => getGradeBadge(info.getValue()),
      minSize: 120,
    }),
    columnHelper.accessor('status', {
      header: 'Profile Status',
      cell: (info) => getStatusBadge(info.getValue()),
      minSize: 120,
    }),
    columnHelper.accessor('address', {
      header: 'Driver Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('joinDate', {
      header: 'Company Joining Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('activeVehicles', {
      header: 'Active Vehicles',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Car size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">{info.getValue()}</span>
        </div>
      ),
      minSize: 120,
    }),
    columnHelper.accessor('lastJobDate', {
      header: 'Last Job Date',
      cell: (info) => {
        const value = info.getValue();
        return (
          <span
            className={`text-sm font-medium ${
              value === 'No Jobs' || value === null
                ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20 px-2 py-1 rounded-full'
                : 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 px-2 py-1 rounded-full'
            }`}
          >
            {value || 'No Jobs'}
          </span>
        );
      },
      minSize: 120,
    }),
    columnHelper.accessor('holdBlockDate', {
      header: 'Hold/Block Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 120,
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
      minSize: 100,
    }),
  ], [columnHelper]);

  const filteredDrivers = useMemo(
    () =>
      drivers.filter((driver) => {
        const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = gradeFilter === 'All' || driver.grade === gradeFilter;
        const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
        return matchesSearch && matchesGrade && matchesStatus;
      }),
    [searchTerm, gradeFilter, statusFilter]
  );

  const table = useReactTable({
    data: filteredDrivers,
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
    setGradeFilter('All');
    setStatusFilter('All');
    table.setPageIndex(0);
  };

  const handleEdit = (driverId: number) => {
    console.log('Edit driver:', driverId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (driverId: number) => {
    console.log('Delete driver:', driverId);
    // TODO: Implement delete functionality
  };

  const handleAddDriver = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      grade: 'Standard',
      status: 'Active',
      address: '',
      joinDate: '',
      activeVehicles: 0,
    });
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'activeVehicles' ? parseInt(value) || 0 : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Driver Name is required');
      return false;
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.joinDate && !dateRegex.test(formData.joinDate)) {
      setError('Join Date must be in DD/MM/YYYY format');
      return false;
    }
    if (formData.activeVehicles < 0) {
      setError('Active Vehicles cannot be negative');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add new driver to the list (in a real app, this would be an API call)
      const newDriver: Driver = {
        ...formData,
        id: Math.max(...drivers.map((d) => d.id)) + 1,
        lastJobDate: 'No Jobs',
        holdBlockDate: null,
      };

      console.log('Creating new driver:', newDriver);

      // In a real app, you would dispatch an action or make an API call here
      // drivers.push(newDriver);

      handleCloseModal();
    } catch (error) {
      setError('Failed to create driver. Please try again.');
      console.error('Error creating driver:', error);
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Owner Driver Summary</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage all owner drivers and their vehicles</p>
              </div>
              <button
                onClick={handleAddDriver}
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
                  value={gradeFilter}
                  onChange={(e) => {
                    setGradeFilter(e.target.value);
                    table.setPageIndex(0);
                  }}
                >
                  <option value="All">All Grades</option>
                  <option value="Standard">Standard</option>
                  <option value="VIP">VIP</option>
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Driver List</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      filteredDrivers.length
                    )} of {filteredDrivers.length} owner drivers
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
                            className={`text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm ${
                              header.id === 'id' ? 'min-w-[80px]' :
                              header.id === 'name' ? 'min-w-[150px]' :
                              header.id === 'grade' ? 'min-w-[120px]' :
                              header.id === 'status' ? 'min-w-[120px]' :
                              header.id === 'address' ? 'min-w-[150px]' :
                              header.id === 'joinDate' ? 'min-w-[150px]' :
                              header.id === 'activeVehicles' ? 'min-w-[120px]' :
                              header.id === 'lastJobDate' ? 'min-w-[120px]' :
                              header.id === 'holdBlockDate' ? 'min-w-[120px]' :
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
                              }[header.column.getIsSorted() as string] ?? null}
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
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${
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
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${
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

      {/* Add Driver Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 bg-black bg-opacity-50 transition-opacity duration-300 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col transform transition-all duration-300 scale-100 opacity-100 mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Driver</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new owner driver entry</p>
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
            <div className="flex-1 overflow-y-scroll p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
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
                  {/* Driver Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Driver Information
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Driver Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter driver name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grade
                      </label>
                      <select
                        name="grade"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.grade}
                        onChange={handleInputChange}
                      >
                        <option value="Standard">Standard</option>
                        <option value="VIP">VIP</option>
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

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter driver address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Additional Details
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Joining Date
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
                        Active Vehicles
                      </label>
                      <input
                        type="number"
                        name="activeVehicles"
                        placeholder="Enter number of active vehicles"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.activeVehicles}
                        onChange={handleInputChange}
                        min="0"
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
                    Create Driver
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation and Scrollbar styles */}
     <style>{`
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
  /* rest of your CSS */
`}</style>

    </>
  );
};

export default OwnerDriver;