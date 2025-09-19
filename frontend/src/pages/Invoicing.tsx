import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Send, 
  Download,
  Eye,
  Calendar,
  CreditCard,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock invoice data
const invoices = [
  {
    id: 'INV-001',
    invoiceDate: '2024-01-15',
    sendDate: '2024-01-16',
    approved: true,
    customerName: 'TechCorp Inc.',
    period: 'Jan 2024',
    net: 2500.00,
    vat: 340.50,
    gross: 2840.50,
    cardCharge: 20.00,
    paidAmount: 2840.50,
    totalDue: 0.00,
    dueDate: '2024-02-15',
    paidDate: '2024-01-20',
    status: 'paid',
    notes: 'Payment received',
  },
  {
    id: 'INV-002',
    invoiceDate: '2024-01-12',
    sendDate: '2024-01-13',
    approved: false,
    customerName: 'Sarah Johnson',
    period: 'Jan 2024',
    net: 137.50,
    vat: 19.25,
    gross: 156.75,
    cardCharge: 0.00,
    paidAmount: 0.00,
    totalDue: 156.75,
    dueDate: '2024-02-12',
    paidDate: null,
    status: 'pending',
    notes: 'Awaiting payment',
  },
  {
    id: 'INV-003',
    invoiceDate: '2023-12-15',
    sendDate: '2023-12-16',
    approved: true,
    customerName: 'Global Logistics Ltd.',
    period: 'Dec 2023',
    net: 3750.00,
    vat: 500.00,
    gross: 4250.00,
    cardCharge: 25.00,
    paidAmount: 0.00,
    totalDue: 4250.00,
    dueDate: '2024-01-15',
    paidDate: null,
    status: 'overdue',
    notes: 'Follow-up required',
  },
  {
    id: 'INV-004',
    invoiceDate: '2024-02-01',
    sendDate: '2024-02-02',
    approved: true,
    customerName: 'Metro Solutions',
    period: 'Feb 2024',
    net: 1200.00,
    vat: 180.00,
    gross: 1380.00,
    cardCharge: 15.00,
    paidAmount: 1380.00,
    totalDue: 0.00,
    dueDate: '2024-03-01',
    paidDate: '2024-02-05',
    status: 'paid',
    notes: 'Early payment discount applied',
  },
  {
    id: 'INV-005',
    invoiceDate: '2024-02-10',
    sendDate: '2024-02-11',
    approved: false,
    customerName: 'StartupXYZ',
    period: 'Feb 2024',
    net: 895.00,
    vat: 125.30,
    gross: 1020.30,
    cardCharge: 0.00,
    paidAmount: 0.00,
    totalDue: 1020.30,
    dueDate: '2024-03-10',
    paidDate: null,
    status: 'pending',
    notes: 'New client',
  },
];

const Invoicing = () => {
  const [filters, setFilters] = useState({
    search: '',
    fromDate: '',
    toDate: '',
    month: 'September 2025',
    client: 'All Clients',
    status: 'All Status',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
      case 'draft': 
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
      month: 'September 2025',
      client: 'All Clients',
      status: 'All Status',
    });
    setCurrentPage(1);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.notes.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesClient = filters.client === 'All Clients' || invoice.customerName === filters.client;
    const matchesStatus = filters.status === 'All Status' || invoice.status === filters.status;
    
    return matchesSearch && matchesClient && matchesStatus;
  });

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.gross, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.totalDue, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.totalDue, 0);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  const uniqueClients = ['All Clients', ...new Set(invoices.map(inv => inv.customerName))];
  const statuses = ['All Status', 'paid', 'pending', 'overdue', 'draft'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Invoicing & Payments</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage billing cycles, statements, and payment processing</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-200">
                <Download size={20} />
                Export to QuickBooks
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800">
                <Plus size={20} />
                Create Invoice
              </button>
            </div>
          </div>
        </div>

        
        {/* Invoices Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
              </div>
            </div>

            {/* Enhanced Filters Section */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
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
                  placeholder="Search by Invoice #, Client Name, or Notes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Date Range Widget */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Date Range</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={filters.fromDate}
                        onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {filters.fromDate && (
                        <button
                          onClick={() => handleFilterChange('fromDate', '')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={filters.toDate}
                        onChange={(e) => handleFilterChange('toDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {filters.toDate && (
                        <button
                          onClick={() => handleFilterChange('toDate', '')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                  <select
                    value={filters.month}
                    onChange={(e) => handleFilterChange('month', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="September 2025">September 2025</option>
                    <option value="August 2025">August 2025</option>
                    <option value="July 2025">July 2025</option>
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
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Export</label>
                  <button className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
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
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Invoice #</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Invoice Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Send Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Approved?</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[180px]">Client Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Period</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Net</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">VAT</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Gross</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Card Charge</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Paid Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Total Due</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Due Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Paid Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Notes</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[80px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{invoice.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{new Date(invoice.sendDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.approved 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {invoice.approved ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            {invoice.customerName.includes('Inc.') || invoice.customerName.includes('Ltd.') ? (
                              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {invoice.customerName.split(' ').map(n => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{invoice.customerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{invoice.period}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">{formatCurrency(invoice.net)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-purple-600 dark:text-purple-400">{formatCurrency(invoice.vat)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(invoice.gross)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(invoice.cardCharge)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(invoice.paidAmount)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">{formatCurrency(invoice.totalDue)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">{invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : '-'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{invoice.notes}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
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

        {/* Payment Processing & Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Processing</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Credit Card Payments</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stripe Integration</p>
                </div>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Bank Transfers</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ACH & Wire</p>
                </div>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Corporate Accounts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Net 30 Terms</p>
                </div>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200">
                <Plus size={16} />
                Add Payment Method
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200">
                <FileText size={16} />
                Generate Monthly Statement
              </button>
              
              <button className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200">
                <Download size={16} />
                Export to QuickBooks
              </button>
              
              <button className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200">
                <Send size={16} />
                Send Payment Reminders
              </button>
              
              <button className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200">
                <TrendingUp size={16} />
                Revenue Report
              </button>
              
              <button className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200">
                <Calendar size={16} />
                Aging Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoicing;