import React, { useState } from 'react';
import { 
  FileText, 
  Archive,
  RotateCcw,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertCircle,
  Info
} from 'lucide-react';

// Mock archived invoice data
const archivedInvoices = [
  {
    id: 'INV-2023-045',
    invoiceDate: '2023-06-15',
    sendDate: '2023-06-16',
    approved: true,
    customerName: 'Legacy Corp Ltd.',
    period: 'Jun 2023',
    net: 5500.00,
    vat: 825.00,
    gross: 6325.00,
    cardCharge: 35.00,
    paidAmount: 6325.00,
    totalDue: 0.00,
    dueDate: '2023-07-15',
    paidDate: '2023-06-25',
    status: 'paid',
    notes: 'Contract completed',
    archivedDate: '2023-12-01',
    archivedBy: 'John Doe',
    archiveReason: 'Contract completion - project closed',
  },
  {
    id: 'INV-2023-032',
    invoiceDate: '2023-04-10',
    sendDate: '2023-04-11',
    approved: true,
    customerName: 'Old Client Industries',
    period: 'Apr 2023',
    net: 2750.00,
    vat: 412.50,
    gross: 3162.50,
    cardCharge: 22.00,
    paidAmount: 3162.50,
    totalDue: 0.00,
    dueDate: '2023-05-10',
    paidDate: '2023-04-28',
    status: 'paid',
    notes: 'Final invoice for client relationship',
    archivedDate: '2023-11-15',
    archivedBy: 'Sarah Smith',
    archiveReason: 'Client relationship ended',
  },
  {
    id: 'INV-2022-198',
    invoiceDate: '2022-12-20',
    sendDate: '2022-12-21',
    approved: true,
    customerName: 'Vintage Solutions',
    period: 'Dec 2022',
    net: 8900.00,
    vat: 1335.00,
    gross: 10235.00,
    cardCharge: 55.00,
    paidAmount: 10235.00,
    totalDue: 0.00,
    dueDate: '2023-01-20',
    paidDate: '2023-01-05',
    status: 'paid',
    notes: 'Year-end final payment',
    archivedDate: '2023-06-30',
    archivedBy: 'Admin System',
    archiveReason: 'Automatic archival after 6 months',
  },
  {
    id: 'INV-2023-089',
    invoiceDate: '2023-09-05',
    sendDate: '2023-09-06',
    approved: false,
    customerName: 'Cancelled Project LLC',
    period: 'Sep 2023',
    net: 1250.00,
    vat: 187.50,
    gross: 1437.50,
    cardCharge: 0.00,
    paidAmount: 0.00,
    totalDue: 1437.50,
    dueDate: '2023-10-05',
    paidDate: null,
    status: 'cancelled',
    notes: 'Project cancelled by client',
    archivedDate: '2023-12-15',
    archivedBy: 'Jane Wilson',
    archiveReason: 'Project cancellation',
  },
  {
    id: 'INV-2022-156',
    invoiceDate: '2022-08-30',
    sendDate: '2022-08-31',
    approved: true,
    customerName: 'Historic Partners Inc.',
    period: 'Aug 2022',
    net: 4200.00,
    vat: 630.00,
    gross: 4830.00,
    cardCharge: 30.00,
    paidAmount: 4830.00,
    totalDue: 0.00,
    dueDate: '2022-09-30',
    paidDate: '2022-09-15',
    status: 'paid',
    notes: 'Long-term client final invoice',
    archivedDate: '2023-03-01',
    archivedBy: 'Michael Chen',
    archiveReason: 'Standard archival policy',
  },
];

const ArchivedInvoices = () => {
  const [filters, setFilters] = useState({
    search: '',
    fromDate: '',
    toDate: '',
    year: 'All Years',
    client: 'All Clients',
    status: 'All Status',
    archiveReason: 'All Reasons',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': 
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue': 
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'cancelled': 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      fromDate: '',
      toDate: '',
      year: 'All Years',
      client: 'All Clients',
      status: 'All Status',
      archiveReason: 'All Reasons',
    });
    setCurrentPage(1);
  };

  const filteredInvoices = archivedInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.notes.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.archiveReason.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesClient = filters.client === 'All Clients' || invoice.customerName === filters.client;
    const matchesStatus = filters.status === 'All Status' || invoice.status === filters.status;
    const matchesReason = filters.archiveReason === 'All Reasons' || invoice.archiveReason.includes(filters.archiveReason);
    
    return matchesSearch && matchesClient && matchesStatus && matchesReason;
  });

  const totalArchived = archivedInvoices.length;
  const totalArchivedValue = archivedInvoices.reduce((sum, inv) => sum + inv.gross, 0);
  const paidArchivedCount = archivedInvoices.filter(inv => inv.status === 'paid').length;
  const cancelledCount = archivedInvoices.filter(inv => inv.status === 'cancelled').length;

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  const uniqueClients = ['All Clients', ...new Set(archivedInvoices.map(inv => inv.customerName))];
  const statuses = ['All Status', 'paid', 'pending', 'overdue', 'cancelled'];
  const archiveReasons = ['All Reasons', 'Contract completion', 'Client relationship ended', 'Project cancellation', 'Standard archival'];

  const handleSelectInvoice = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleRestoreInvoices = () => {
    if (selectedInvoices.length > 0) {
      setShowRestoreConfirm(true);
    }
  };

  const confirmRestore = () => {
    // Here you would implement the actual restore functionality
    console.log('Restoring invoices:', selectedInvoices);
    setSelectedInvoices([]);
    setShowRestoreConfirm(false);
  };

  const cancelRestore = () => {
    setShowRestoreConfirm(false);
  };

  const handleExportCSV = () => {
    // Implement CSV export functionality
    console.log('Exporting filtered invoices to CSV');
  };

  const handleViewInvoice = (invoiceId) => {
    // Implement view invoice functionality
    console.log('Viewing invoice:', invoiceId);
  };

  const handleDeleteInvoice = (invoiceId) => {
    // Implement delete invoice functionality
    console.log('Deleting invoice:', invoiceId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Archive className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Archived Invoices</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">View and manage historical invoice records</p>
            </div>
            <div className="flex items-center gap-3">
              {selectedInvoices.length > 0 && (
                <button 
                  onClick={handleRestoreInvoices}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <RotateCcw size={20} />
                  Restore ({selectedInvoices.length})
                </button>
              )}
              <button 
                onClick={() => handleExportCSV()}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Download size={20} />
                Export Archive
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Archive Information</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Archived invoices are historical records that have been moved from active billing. 
                You can restore them to active status or permanently delete them. 
                All financial data and audit trails are preserved.
              </p>
            </div>
          </div>
        </div>

        {/* Archived Invoices Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Archived Invoice Records</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} archived invoices
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
              </div>
            </div>

            {/* Enhanced Filters Section */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Archive Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors duration-200"
                >
                  <X size={16} />
                  Clear All
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by Invoice #, Client Name, Notes, or Archive Reason..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="All Years">All Years</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                  <select
                    value={filters.client}
                    onChange={(e) => handleFilterChange('client', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {uniqueClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Archive Reason</label>
                  <select
                    value={filters.archiveReason}
                    onChange={(e) => handleFilterChange('archiveReason', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {archiveReasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Export</label>
                  <button 
                    onClick={handleExportCSV}
                    className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <Download size={16} />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[60px]">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInvoices(paginatedInvoices.map(inv => inv.id));
                          } else {
                            setSelectedInvoices([]);
                          }
                        }}
                        checked={selectedInvoices.length === paginatedInvoices.length && paginatedInvoices.length > 0}
                      />
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Invoice #</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[180px]">Client Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Invoice Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Period</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Gross Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Archived Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Archived By</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[200px]">Archive Reason</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={() => handleSelectInvoice(invoice.id)}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-purple-600 dark:text-purple-400 font-medium">{invoice.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              {invoice.customerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{invoice.customerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{invoice.period}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(invoice.gross)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{new Date(invoice.archivedDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{invoice.archivedBy}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{invoice.archiveReason}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSelectInvoice(invoice.id)}
                            className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                            title="Restore Invoice"
                          >
                            <RotateCcw size={16} />
                          </button>
                          <button 
                            onClick={() => handleViewInvoice(invoice.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                      currentPage === totalPages
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
          )}
        </div>

        {/* Restore Confirmation Modal */}
        {showRestoreConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Restore</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to restore {selectedInvoices.length} invoice(s) to active status? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelRestore}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRestore}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Restore Invoices
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedInvoices;