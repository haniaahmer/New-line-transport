import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  DollarSign,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const RefundSummary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isProcessRefundOpen, setIsProcessRefundOpen] = useState(false);
  const [newRefund, setNewRefund] = useState({
    bookingId: "",
    bookingDate: "",
    passenger: "",
    address: "",
    previousAmount: "",
    updatedAmount: "",
    refundAmount: "",
    status: "Pending",
  });

  const refunds = [
    {
      bookingId: "BK2024001",
      bookingDate: "15/08/2025",
      passenger: "Ahmed Al-Rashid",
      address: "Riyadh, Saudi Arabia",
      previousAmount: "2,500 SAR",
      updatedAmount: "2,000 SAR",
      refundAmount: "500 SAR",
      status: "Processed",
      processedDate: "20/08/2025",
    },
    {
      bookingId: "BK2024002",
      bookingDate: "20/08/2025",
      passenger: "Sarah Johnson",
      address: "Jeddah, Saudi Arabia",
      previousAmount: "1,800 SAR",
      updatedAmount: "1,200 SAR",
      refundAmount: "600 SAR",
      status: "Pending",
      processedDate: "",
    },
    {
      bookingId: "BK2024003",
      bookingDate: "25/08/2025",
      passenger: "Mohammed Hassan",
      address: "Dammam, Saudi Arabia",
      previousAmount: "3,200 SAR",
      updatedAmount: "2,800 SAR",
      refundAmount: "400 SAR",
      status: "Approved",
      processedDate: "30/08/2025",
    },
    {
      bookingId: "BK2024004",
      bookingDate: "01/09/2025",
      passenger: "Fatima Al-Zahra",
      address: "Mecca, Saudi Arabia",
      previousAmount: "4,500 SAR",
      updatedAmount: "3,500 SAR",
      refundAmount: "1,000 SAR",
      status: "Rejected",
      processedDate: "05/09/2025",
    },
    {
      bookingId: "BK2024005",
      bookingDate: "10/09/2025",
      passenger: "Omar Abdullah",
      address: "Medina, Saudi Arabia",
      previousAmount: "2,200 SAR",
      updatedAmount: "1,800 SAR",
      refundAmount: "400 SAR",
      status: "Processing",
      processedDate: "",
    },
  ];

  const totalRefundAmount = refunds.reduce((sum, refund) => {
    const amount = parseFloat(refund.refundAmount.replace(/[^\d.]/g, ""));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const getStatusBadge = (status) => {
    const statusColors = {
      Processed:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      Pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      Processing:
        "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      Approved:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
      Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          statusColors[status] ||
          "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {status}
      </span>
    );
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("bookingId", {
      header: "Booking ID #",
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("bookingDate", {
      header: "Booking Date",
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("passenger", {
      header: "Passenger",
      cell: (info) => (
        <span className="text-gray-900 dark:text-white font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("previousAmount", {
      header: "Previous Booking Amount",
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("updatedAmount", {
      header: "Updated Booking Amount",
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("refundAmount", {
      header: "Refund Amount",
      cell: (info) => (
        <span className="text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => getStatusBadge(info.getValue()),
    }),
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original.bookingId)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
            title="Edit Refund"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.bookingId)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
            title="Delete Refund"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredRefunds = useMemo(
    () =>
      refunds.filter((refund) => {
        const matchesSearch =
          refund.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          refund.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
          refund.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || refund.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [searchTerm, statusFilter]
  );

  const table = useReactTable({
    data: filteredRefunds,
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
    setSearchTerm("");
    setStatusFilter("All");
    setDateRangeFilter("All");
    table.setPageIndex(0);
  };

  const handleEdit = (bookingId) => {
    console.log("Edit refund:", bookingId);
  };

  const handleDelete = (bookingId) => {
    console.log("Delete refund:", bookingId);
  };

  const handleAddRefund = () => {
    setIsProcessRefundOpen(true);
  };

  const handleCloseProcessRefund = () => {
    setIsProcessRefundOpen(false);
    setNewRefund({
      bookingId: "",
      bookingDate: "",
      passenger: "",
      address: "",
      previousAmount: "",
      updatedAmount: "",
      refundAmount: "",
      status: "Pending",
    });
  };

  const handleRefundInputChange = (e) => {
    const { name, value } = e.target;
    setNewRefund(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    console.log("Process new refund:", newRefund);
    // Here you would typically process the refund
    handleCloseProcessRefund();
  };

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                AMS / Refund Summary
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage all booking refunds and their processing status
              </p>
            </div>
            <button
              onClick={handleAddRefund}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Process Refund
            </button>
          </div>
        </div>

        {/* Process Refund Modal */}
        {isProcessRefundOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={handleCloseProcessRefund}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Process New Refund
              </h2>

              <form onSubmit={handleRefundSubmit} className="space-y-6">
  {/* Row 1 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Booking ID
      </label>
      <input
        type="text"
        name="bookingId"
        value={newRefund.bookingId}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter booking ID"
        required
      />
    </div>

    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Booking Date
      </label>
      <input
        type="date"
        name="bookingDate"
        value={newRefund.bookingDate}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        required
      />
    </div>
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Passenger Name
      </label>
      <input
        type="text"
        name="passenger"
        value={newRefund.passenger}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter passenger name"
        required
      />
    </div>

    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={newRefund.address}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter address"
        required
      />
    </div>
  </div>

  {/* Row 3 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Previous Amount
      </label>
      <input
        type="text"
        name="previousAmount"
        value={newRefund.previousAmount}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter previous amount"
        required
      />
    </div>

    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Updated Amount
      </label>
      <input
        type="text"
        name="updatedAmount"
        value={newRefund.updatedAmount}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter updated amount"
        required
      />
    </div>
  </div>

  {/* Row 4 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Refund Amount
      </label>
      <input
        type="text"
        name="refundAmount"
        value={newRefund.refundAmount}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter refund amount"
        required
      />
    </div>

    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-1">
        Status
      </label>
      <select
        name="status"
        value={newRefund.status}
        onChange={handleRefundInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Approved">Approved</option>
        <option value="Processed">Processed</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all"
  >
    Process Refund
  </button>
</form>

            </div>
          </div>
        )}

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
                  placeholder="Search refunds..."
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
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={dateRangeFilter}
                onChange={(e) => setDateRangeFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last 30 Days">Last 30 Days</option>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Refund List
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing{" "}
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                  -
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    filteredRefunds.length
                  )}{" "}
                  of {filteredRefunds.length} refunds
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Show:
                </span>
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
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  per page
                </span>
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
                            header.id === "bookingId"
                              ? "min-w-[120px]"
                              : header.id === "bookingDate"
                              ? "min-w-[120px]"
                              : header.id === "passenger"
                              ? "min-w-[150px]"
                              : header.id === "address"
                              ? "min-w-[180px]"
                              : header.id === "previousAmount"
                              ? "min-w-[150px]"
                              : header.id === "updatedAmount"
                              ? "min-w-[150px]"
                              : header.id === "refundAmount"
                              ? "min-w-[120px]"
                              : header.id === "status"
                              ? "min-w-[120px]"
                              : header.id === "actions"
                              ? "min-w-[100px]"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {{
                              asc: " ↑",
                              desc: " ↓",
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  !table.getCanPreviousPage()
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

export default RefundSummary;