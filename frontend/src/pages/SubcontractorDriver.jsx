import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Car, CheckCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const stats = [
    { title: 'Total Subcontractors', value: drivers.length, icon: Users, color: 'blue' },
    { title: 'Active Subcontractors', value: drivers.filter(d => d.status === 'Active').length, icon: CheckCircle, color: 'green' },
    { title: 'London Based', value: drivers.filter(d => d.londonBased === 'Yes').length, icon: Car, color: 'purple' },
    { title: 'International Region', value: drivers.filter(d => d.region === 'International').length, icon: Calendar, color: 'orange' },
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

  const columns = [
    columnHelper.accessor('id', {
      header: 'Sl.No.',
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
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('grade', {
      header: 'Grade',
      cell: (info) => getGradeBadge(info.getValue()),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.accessor('region', {
      header: 'Region',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('londonBased', {
      header: 'London Based?',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('officeAddress', {
      header: 'Office Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('country', {
      header: 'Country Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('contactName', {
      header: 'Contact Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Phone Number',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'E-Mail Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
    }),
    columnHelper.accessor('joinDate', {
      header: 'Company Joining Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
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
    }),
    columnHelper.accessor('holdBlockDate', {
      header: 'Hold/Block Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue() || '-'}</span>,
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
  };

  const handleDelete = (driverId) => {
    console.log('Delete driver:', driverId);
  };

  const handleAddDriver = () => {
    console.log('Add new driver');
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
                <p className="text-gray-600 dark:text-gray-400 mt-1">
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
                className=`flex items-center gap-1 px-4 py-2 rounded-lg ${
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

export default SubcontractorDriver;