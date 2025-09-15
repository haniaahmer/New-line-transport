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

// Mock data for Generate Invoice
const invoiceData = {
  accounts: ['Account 1', 'Account 2', 'Account 3'],
  services: [
    { details: 'Service 1', timeManagement: '2h', pickup: 'Yes', dropoff: 'No', wtMins: 30, charge: 50, parking: 10, congestion: 5, basePrice: 100, total: 165, adminFees: 5, netVat: 20, cancelled: false },
    { details: 'Service 2', timeManagement: '1h', pickup: 'No', dropoff: 'Yes', wtMins: 15, charge: 25, parking: 0, congestion: 0, basePrice: 50, total: 75, adminFees: 2, netVat: 8, cancelled: true },
  ],
};

const GenerateInvoice = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [invoiceType, setInvoiceType] = useState('Invoice by Job No.');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating invoice for:', { selectedAccount, invoiceType, dateRange });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generate Manual Invoice</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Create invoices, credit notes, or refund receipts</p>
            </div>
          </div>
        </div>

        {/* Invoice Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Account</label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Account</option>
                  {invoiceData.accounts.map((account) => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Type</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Invoice by Job No."
                      checked={invoiceType === 'Invoice by Job No.'}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Invoice by Job No.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Card Charge"
                      checked={invoiceType === 'Card Charge'}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Card Charge</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Manual Invoice (Single Page)"
                      checked={invoiceType === 'Manual Invoice (Single Page)'}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Manual Invoice (Single Page)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Cash Invoice"
                      checked={invoiceType === 'Cash Invoice'}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Cash Invoice</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Proforma Invoice"
                      checked={invoiceType === 'Proforma Invoice'}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Proforma Invoice</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Date</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Breakdown of Services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Breakdown of Services</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Journey Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Time Management</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Pickup</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Dropoff</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">WT (Mins)</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Charge</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Parking</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Congestion</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Base Price</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Total</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Admin Fees</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Net + Vat</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Cancelled?</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{service.details}</td>
                      <td className="py-4 px-6">{service.timeManagement}</td>
                      <td className="py-4 px-6">{service.pickup}</td>
                      <td className="py-4 px-6">{service.dropoff}</td>
                      <td className="py-4 px-6">{service.wtMins}</td>
                      <td className="py-4 px-6">${service.charge}</td>
                      <td className="py-4 px-6">${service.parking}</td>
                      <td className="py-4 px-6">${service.congestion}</td>
                      <td className="py-4 px-6">${service.basePrice}</td>
                      <td className="py-4 px-6">${service.total}</td>
                      <td className="py-4 px-6">${service.adminFees}</td>
                      <td className="py-4 px-6">${service.netVat}</td>
                      <td className="py-4 px-6">{service.cancelled ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-700 font-semibold">
                    <td className="py-4 px-6" colSpan="2">Total</td>
                    <td className="py-4 px-6">{invoiceData.services.reduce((sum, s) => sum + (s.timeManagement.match(/\d+/) ? parseInt(s.timeManagement.match(/\d+/)[0]) : 0), 0)}h</td>
                    <td className="py-4 px-6">{invoiceData.services.filter(s => s.pickup === 'Yes').length}</td>
                    <td className="py-4 px-6">{invoiceData.services.filter(s => s.dropoff === 'Yes').length}</td>
                    <td className="py-4 px-6">{invoiceData.services.reduce((sum, s) => sum + s.wtMins, 0)} mins</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.charge, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.parking, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.congestion, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.basePrice, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.total, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.adminFees, 0)}</td>
                    <td className="py-4 px-6">${invoiceData.services.reduce((sum, s) => sum + s.netVat, 0)}</td>
                    <td className="py-4 px-6">{invoiceData.services.filter(s => s.cancelled).length} cancelled</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;