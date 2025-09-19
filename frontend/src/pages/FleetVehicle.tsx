import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Eye, Truck, X, Check, AlertCircle, ChevronLeft, ChevronRight,Car } from 'lucide-react';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    category: 'luxury',
    type: '',
    regNo: '',
    keeper: '',
    keeperAddress: '',
    purchaseDate: '',
    joinDate: '',
    status: 'Active',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const columns = useMemo(() => [
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
  ], []);

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

  const handleEdit = (vehicleId) => {
    console.log('Edit vehicle:', vehicleId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (vehicleId) => {
    console.log('Delete vehicle:', vehicleId);
    // TODO: Implement delete functionality
  };

  const handleAddVehicle = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      category: 'luxury',
      type: '',
      regNo: '',
      keeper: '',
      keeperAddress: '',
      purchaseDate: '',
      joinDate: '',
      status: 'Active',
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
    if (!formData.type.trim()) {
      setError('Vehicle Type is required');
      return false;
    }
    if (!formData.regNo.trim()) {
      setError('Registration Number is required');
      return false;
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.purchaseDate && !dateRegex.test(formData.purchaseDate)) {
      setError('Purchase Date must be in DD/MM/YYYY format');
      return false;
    }
    if (formData.joinDate && !dateRegex.test(formData.joinDate)) {
      setError('Join Date must be in DD/MM/YYYY format');
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
      
      // Add new vehicle to the list (in a real app, this would be an API call)
      const newVehicle = {
        ...formData,
        id: Math.max(...vehicles.map(v => v.id)) + 1,
        lastJobDate: 'No Jobs'
      };
      
      console.log('Creating new vehicle:', newVehicle);
      
      // In a real app, you would dispatch an action or make an API call here
      // vehicles.push(newVehicle);
      
      handleCloseModal();
    } catch (error) {
      setError('Failed to create vehicle. Please try again.');
      console.error('Error creating vehicle:', error);
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fleet Vehicle Summary</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage all fleet vehicles and their information</p>
              </div>
              <button
                onClick={handleAddVehicle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <Plus size={20} />
                Add Vehicle
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vehicle List</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
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

      {/* Enhanced Add Vehicle Modal */}
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
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Vehicle</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new fleet vehicle entry</p>
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
                  {/* Vehicle Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Vehicle Information
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Vehicle Type *
                      </label>
                      <input
                        type="text"
                        name="type"
                        placeholder="Enter vehicle type (e.g., BMW)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        name="regNo"
                        placeholder="Enter registration number"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.regNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="luxury">Luxury</option>
                        <option value="sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="VAN">VAN</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Keeper Name
                      </label>
                      <input
                        type="text"
                        name="keeper"
                        placeholder="Enter keeper name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.keeper}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Keeper Address
                      </label>
                      <input
                        type="text"
                        name="keeperAddress"
                        placeholder="Enter keeper address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.keeperAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Date Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Date Information
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Purchase Date
                      </label>
                      <input
                        type="text"
                        name="purchaseDate"
                        placeholder="Enter purchase date (DD/MM/YYYY)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}
                      />
                    </div>

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
                    Create Vehicle
                  </>
                )} 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation and Scrollbar styles */}
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
        .scrollbar-thin {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(209, 213, 219, 0.7) rgba(243, 244, 246, 0.5); /* Firefox */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5); /* Light mode track */
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(209, 213, 219, 0.7); /* Light mode thumb */
          border-radius: 4px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5); /* Dark mode track */
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.7); /* Dark mode thumb */
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.9);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </>
  );
};

export default FleetVehicle;