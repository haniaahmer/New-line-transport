import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, X, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const SubcontractorDriver = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [londonBasedFilter, setLondonBasedFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    grade: 'Standard',
    status: 'Active',
    region: 'International',
    londonBased: 'Yes',
    officeAddress: '',
    country: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    joinDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const drivers = [
    {
      id: 1,
      name: 'DENO PARTNER',
      type: 'Chauffeurs & Coach Company',
      grade: 'Standard',
      status: 'Active',
      region: 'International',
      londonBased: 'Yes',
      officeAddress: 'kotinsab',
      country: 'India',
      contactName: '',
      phoneNumber: '',
      email: '',
      joinDate: '06/05/2024',
      lastJobDate: '',
      holdBlockDate: null,
    },
    {
      id: 2,
      name: 'ANOTHER PARTNER',
      type: 'Transport Services',
      grade: 'VIP',
      status: 'Active',
      region: 'National',
      londonBased: 'No',
      officeAddress: 'London',
      country: 'UK',
      contactName: 'John Smith',
      phoneNumber: '123-456-7890',
      email: 'john@example.com',
      joinDate: '01/01/2024',
      lastJobDate: '15/06/2024',
      holdBlockDate: null,
    },
    {
      id: 3,
      name: 'GLOBAL SERVICES',
      type: 'Luxury Transport',
      grade: 'Standard',
      status: 'Inactive',
      region: 'International',
      londonBased: 'Yes',
      officeAddress: 'Paris',
      country: 'France',
      contactName: 'Marie Curie',
      phoneNumber: '987-654-3210',
      email: 'marie@example.com',
      joinDate: '12/03/2024',
      lastJobDate: 'No Jobs',
      holdBlockDate: '01/07/2024',
    },
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

  const getGradeBadge = (grade) => (
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

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'Sr.No.',
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
      minSize: 80,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
      minSize: 150,
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('grade', {
      header: 'Grade',
      cell: (info) => getGradeBadge(info.getValue()),
      minSize: 120,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
      minSize: 120,
    }),
    columnHelper.accessor('region', {
      header: 'Region',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
      minSize: 120,
    }),
    columnHelper.accessor('londonBased', {
      header: 'London Based?',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
      minSize: 120,
    }),
    columnHelper.accessor('officeAddress', {
      header: 'Office Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('country', {
      header: 'Country Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 120,
    }),
    columnHelper.accessor('contactName', {
      header: 'Contact Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Phone Number',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('email', {
      header: 'E-Mail Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('joinDate', {
      header: 'Company Joining Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
      minSize: 150,
    }),
    columnHelper.accessor('lastJobDate', {
      header: 'Last Job Date',
      cell: (info) => {
        const value = info.getValue();
        return (
          <span
            className={`text-sm font-medium ${
              value === 'No Jobs'
                ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20 px-2 py-1 rounded-full'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {value || '-'}
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
  ], []);

  const filteredDrivers = useMemo(
    () =>
      drivers.filter((driver) => {
        const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = gradeFilter === 'All' || driver.grade === gradeFilter;
        const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
        const matchesRegion = regionFilter === 'All' || driver.region === regionFilter;
        const matchesLondon = londonBasedFilter === 'All' || driver.londonBased === londonBasedFilter;
        return matchesSearch && matchesGrade && matchesStatus && matchesRegion && matchesLondon;
      }),
    [searchTerm, gradeFilter, statusFilter, regionFilter, londonBasedFilter]
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
    setRegionFilter('All');
    setLondonBasedFilter('All');
    table.setPageIndex(0);
  };

  const handleEdit = (driverId) => {
    console.log('Edit driver:', driverId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (driverId) => {
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
      type: '',
      grade: 'Standard',
      status: 'Active',
      region: 'International',
      londonBased: 'Yes',
      officeAddress: '',
      country: '',
      contactName: '',
      phoneNumber: '',
      email: '',
      joinDate: '',
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Subcontractor Name is required');
      return false;
    }
    if (!formData.type.trim()) {
      setError('Type is required');
      return false;
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.joinDate && !dateRegex.test(formData.joinDate)) {
      setError('Join Date must be in DD/MM/YYYY format');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    const phoneRegex = /^\+?[\d\s-]{7,}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setError('Invalid phone number format');
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add new driver to the list (in a real app, this would be an API call)
      const newDriver = {
        ...formData,
        id: Math.max(...drivers.map((d) => d.id)) + 1,
        lastJobDate: 'No Jobs',
        holdBlockDate: null,
      };

      console.log('Creating new subcontractor:', newDriver);

      // In a real app, you would dispatch an action or make an API call here
      // drivers.push(newDriver);

      handleCloseModal();
    } catch (error) {
      setError('Failed to create subcontractor. Please try again.');
      console.error('Error creating subcontractor:', error);
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Subcontractor Driver Summary</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage all subcontractor drivers and their details</p>
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
                    placeholder="Search subcontractors..."
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
                <select
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={regionFilter}
                  onChange={(e) => {
                    setRegionFilter(e.target.value);
                    table.setPageIndex(0);
                  }}
                >
                  <option value="All">All Regions</option>
                  <option value="International">International</option>
                  <option value="National">National</option>
                </select>
                <select
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={londonBasedFilter}
                  onChange={(e) => {
                    setLondonBasedFilter(e.target.value);
                    table.setPageIndex(0);
                  }}
                >
                  <option value="All">All</option>
                  <option value="Yes">London Based</option>
                  <option value="No">Not London Based</option>
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subcontractor List</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      filteredDrivers.length
                    )} of {filteredDrivers.length} subcontractors
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
                              header.id === 'type' ? 'min-w-[150px]' :
                              header.id === 'grade' ? 'min-w-[120px]' :
                              header.id === 'status' ? 'min-w-[120px]' :
                              header.id === 'region' ? 'min-w-[120px]' :
                              header.id === 'londonBased' ? 'min-w-[120px]' :
                              header.id === 'officeAddress' ? 'min-w-[150px]' :
                              header.id === 'country' ? 'min-w-[120px]' :
                              header.id === 'contactName' ? 'min-w-[150px]' :
                              header.id === 'phoneNumber' ? 'min-w-[150px]' :
                              header.id === 'email' ? 'min-w-[150px]' :
                              header.id === 'joinDate' ? 'min-w-[150px]' :
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

      {/* Add Subcontractor Modal */}
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Subcontractor</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new subcontractor entry</p>
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
                  {/* Subcontractor Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Subcontractor Information
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subcontractor Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter subcontractor name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type *
                      </label>
                      <input
                        type="text"
                        name="type"
                        placeholder="Enter type (e.g., Transport Services)"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.type}
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
                        Region
                      </label>
                      <select
                        name="region"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.region}
                        onChange={handleInputChange}
                      >
                        <option value="International">International</option>
                        <option value="National">National</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        London Based?
                      </label>
                      <select
                        name="londonBased"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.londonBased}
                        onChange={handleInputChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact & Location Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                      Contact & Location Details
                    </h4>

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
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Enter country name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        placeholder="Enter contact name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.contactName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all duration-200"
                        value={formData.email}
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
                    Create Subcontractor
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

export default SubcontractorDriver;