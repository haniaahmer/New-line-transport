import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, CheckCircle, Calendar, Truck, DollarSign, ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ClearedBooking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      accountName: 'Company A', 
      jobNo: '001', 
      jobRef: 'REF001', 
      jobDate: '2025-09-09', 
      time: '14:30', 
      passenger: 'John Doe', 
      jobType: 'Standard', 
      reqVeh: 'Van', 
      pickUpAddress: '123 London St, London', 
      dropOffAddress: '456 Birmingham Rd, Birmingham', 
      distanceDriven: '150 km', 
      driver: 'Mike S', 
      total: '$120', 
      paymentType: 'Credit Card', 
      priceReview: 'Approved', 
      status: 'Cleared' 
    },
    { 
      id: 2, 
      accountName: 'Company B', 
      jobNo: '002', 
      jobRef: 'REF002', 
      jobDate: '2025-09-08', 
      time: '09:15', 
      passenger: 'Jane Smith', 
      jobType: 'Express', 
      reqVeh: 'Truck', 
      pickUpAddress: '789 Manchester Ave, Manchester', 
      dropOffAddress: '101 Liverpool Ln, Liverpool', 
      distanceDriven: '200 km', 
      driver: 'Sarah L', 
      total: '$200', 
      paymentType: 'Cash', 
      priceReview: 'Pending', 
      status: 'Cleared' 
    },
    { 
      id: 3, 
      accountName: 'Company C', 
      jobNo: '003', 
      jobRef: 'REF003', 
      jobDate: '2025-09-07', 
      time: '16:45', 
      passenger: 'Alex P', 
      jobType: 'Priority', 
      reqVeh: 'Van', 
      pickUpAddress: '321 Edinburgh Rd, Edinburgh', 
      dropOffAddress: '654 Glasgow St, Glasgow', 
      distanceDriven: '180 km', 
      driver: 'Tom R', 
      total: '$150', 
      paymentType: 'Bank Transfer', 
      priceReview: 'Approved', 
      status: 'Cleared' 
    },
  ]);

  const [newBooking, setNewBooking] = useState({
    accountName: '',
    jobNo: '',
    jobRef: '',
    jobDate: '',
    time: '',
    passenger: '',
    jobType: '',
    reqVeh: '',
    pickUpAddress: '',
    dropOffAddress: '',
    distanceDriven: '',
    driver: '',
    total: '',
    paymentType: '',
    priceReview: '',
    status: 'Cleared',
  });


  const getStatusBadge = (status) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Cleared'
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      {status}
    </span>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('jobNo', {
      header: 'Job No.#',
      cell: (info) => <span className="text-gray-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('jobRef', {
      header: 'Job Ref',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('jobDate', {
      header: 'Job Date',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('passenger', {
      header: 'Passenger',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('jobType', {
      header: 'Job Type',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('reqVeh', {
      header: 'Req. Veh.',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pickUpAddress', {
      header: 'Pick Up Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('dropOffAddress', {
      header: 'Drop Off Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('distanceDriven', {
      header: 'Distance Driven',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('driver', {
      header: 'Driver',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('paymentType', {
      header: 'Payment Type',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('priceReview', {
      header: 'Price Review',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
            aria-label="Edit booking"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
            aria-label="Delete booking"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const matchesSearch = booking.jobRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             booking.pickUpAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             booking.dropOffAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             booking.driver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [bookings, searchTerm, statusFilter]
  );

  const table = useReactTable({
    data: filteredBookings,
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

  const handleAddBooking = () => {
    setEditingBooking(null);
    setNewBooking({
      accountName: '',
      jobNo: '',
      jobRef: '',
      jobDate: '',
      time: '',
      passenger: '',
      jobType: '',
      reqVeh: '',
      pickUpAddress: '',
      dropOffAddress: '',
      distanceDriven: '',
      driver: '',
      total: '',
      paymentType: '',
      priceReview: '',
      status: 'Cleared',
    });
    setShowAddBookingModal(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setNewBooking({ ...booking });
    setShowAddBookingModal(true);
  };

  const handleDelete = (bookingId) => {
    setDeleteConfirm(bookingId);
  };

  const confirmDelete = () => {
    setBookings(bookings.filter((booking) => booking.id !== deleteConfirm));
    setDeleteConfirm(null);
  };

  const handleCloseModal = () => {
    setShowAddBookingModal(false);
    setEditingBooking(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === editingBooking.id ? { ...newBooking, id: editingBooking.id } : booking
        )
      );
    } else {
      const bookingToAdd = {
        id: Math.max(...bookings.map((booking) => booking.id), 0) + 1,
        ...newBooking,
      };
      setBookings([...bookings, bookingToAdd]);
    }
    handleCloseModal();
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
    alert('CSV export functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cleared Booking</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all cleared booking details</p>
            </div>
            <button
              onClick={handleAddBooking}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Booking
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
                  placeholder="Search bookings..."
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
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  table.setPageIndex(0);
                }}
              >
                <option value="All">All Status</option>
                <option value="Cleared">Cleared</option>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Booking List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredBookings.length
                  )} of {filteredBookings.length} bookings
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
                            header.id === 'accountName' ? 'min-w-[150px]' :
                            header.id === 'jobNo' ? 'min-w-[100px]' :
                            header.id === 'jobRef' ? 'min-w-[120px]' :
                            header.id === 'jobDate' ? 'min-w-[120px]' :
                            header.id === 'time' ? 'min-w-[100px]' :
                            header.id === 'passenger' ? 'min-w-[150px]' :
                            header.id === 'jobType' ? 'min-w-[120px]' :
                            header.id === 'reqVeh' ? 'min-w-[100px]' :
                            header.id === 'pickUpAddress' ? 'min-w-[200px]' :
                            header.id === 'dropOffAddress' ? 'min-w-[200px]' :
                            header.id === 'distanceDriven' ? 'min-w-[120px]' :
                            header.id === 'driver' ? 'min-w-[120px]' :
                            header.id === 'total' ? 'min-w-[100px]' :
                            header.id === 'paymentType' ? 'min-w-[120px]' :
                            header.id === 'priceReview' ? 'min-w-[120px]' :
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
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="py-8 text-center text-gray-500 dark:text-gray-400">
                        No bookings found. {bookings.length === 0 ? 'Add your first booking using the "Add Booking" button.' : 'Try adjusting your search or filters.'}
                      </td>
                    </tr>
                  )}
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

        {/* Add/Edit Booking Modal */}
        {showAddBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingBooking ? 'Edit Booking' : 'Add New Booking'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Account Name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={newBooking.accountName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., Company A"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Job No.#
                      </label>
                      <input
                        type="text"
                        name="jobNo"
                        value={newBooking.jobNo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., 001"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Job Ref
                      </label>
                      <input
                        type="text"
                        name="jobRef"
                        value={newBooking.jobRef}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., REF001"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Calendar size={14} />
                        Job Date
                      </label>
                      <input
                        type="date"
                        name="jobDate"
                        value={newBooking.jobDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Calendar size={14} />
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={newBooking.time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Passenger
                      </label>
                      <input
                        type="text"
                        name="passenger"
                        value={newBooking.passenger}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Job Type
                      </label>
                      <select
                        name="jobType"
                        value={newBooking.jobType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="" disabled>Select Job Type</option>
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                        <option value="Priority">Priority</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Required Vehicle
                      </label>
                      <select
                        name="reqVeh"
                        value={newBooking.reqVeh}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="" disabled>Select Vehicle</option>
                        <option value="Van">Van</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <MapPin size={14} />
                        Pick Up Address
                      </label>
                      <input
                        type="text"
                        name="pickUpAddress"
                        value={newBooking.pickUpAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., 123 London St, London"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <MapPin size={14} />
                        Drop Off Address
                      </label>
                      <input
                        type="text"
                        name="dropOffAddress"
                        value={newBooking.dropOffAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., 456 Birmingham Rd, Birmingham"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Distance Driven
                      </label>
                      <input
                        type="text"
                        name="distanceDriven"
                        value={newBooking.distanceDriven}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., 150 km"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <Truck size={14} />
                        Driver
                      </label>
                      <input
                        type="text"
                        name="driver"
                        value={newBooking.driver}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., Mike S"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <DollarSign size={14} />
                        Total
                      </label>
                      <input
                        type="text"
                        name="total"
                        value={newBooking.total}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                        placeholder="e.g., $120"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <DollarSign size={14} />
                        Payment Type
                      </label>
                      <select
                        name="paymentType"
                        value={newBooking.paymentType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="" disabled>Select Payment Type</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <CheckCircle size={14} />
                        Price Review
                      </label>
                      <select
                        name="priceReview"
                        value={newBooking.priceReview}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="" disabled>Select Price Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Modal Footer */}
                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-150 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-150 text-sm dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      {editingBooking ? 'Update Booking' : 'Add Booking'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-150 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-150 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearedBooking;