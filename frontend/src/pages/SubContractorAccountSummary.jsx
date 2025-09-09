import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, CreditCard, Calendar, Building, ChevronLeft, ChevronRight } from 'lucide-react';

const SubContractorAccountSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const accounts = [
    { 
      id: 1, 
      name: 'DENO PARTNER', 
      accountPayable: '£1,250.00', 
      pjNumber: 'PJ-2024-001', 
      paymentType: 'Credit', 
      jobDate: '06/05/2024', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'ABC CONTRACTORS', 
      accountPayable: '£2,500.00', 
      pjNumber: 'PJ-2024-002', 
      paymentType: 'Cash', 
      jobDate: '12/05/2024', 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'XYZ SERVICES', 
      accountPayable: '£0.00', 
      pjNumber: 'PJ-2024-003', 
      paymentType: 'Credit', 
      jobDate: '18/05/2024', 
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'GLOBAL BUILDERS', 
      accountPayable: '£3,750.00', 
      pjNumber: 'PJ-2024-004', 
      paymentType: 'Credit', 
      jobDate: '24/05/2024', 
      status: 'Inactive' 
    },
    { 
      id: 5, 
      name: 'QUALITY CONSTRUCTION', 
      accountPayable: '£1,800.00', 
      pjNumber: 'PJ-2024-005', 
      paymentType: 'Cash', 
      jobDate: '30/05/2024', 
      status: 'Active' 
    },
    { 
      id: 6, 
      name: 'ELITE DEVELOPERS', 
      accountPayable: '£0.00', 
      pjNumber: 'PJ-2024-006', 
      paymentType: 'Credit', 
      jobDate: '05/06/2024', 
      status: 'Active' 
    },
    { 
      id: 7, 
      name: 'PRIME CONTRACTORS', 
      accountPayable: '£4,200.00', 
      pjNumber: 'PJ-2024-007', 
      paymentType: 'Cash', 
      jobDate: '11/06/2024', 
      status: 'Inactive' 
    },
  ];

  const stats = [
    { title: 'Total Sub-Contractors', value: accounts.length, icon: Users, color: 'blue' },
    { title: 'Active Sub-Contractors', value: accounts.filter(a => a.status === 'Active').length, icon: CreditCard, color: 'green' },
    { title: 'Accounts Payable', value: accounts.filter(a => parseFloat(a.accountPayable.replace(/[^0-9.-]+/g, "")) > 0).length, icon: Building, color: 'purple' },
    { title: 'Recent Jobs', value: accounts.filter(a => a.jobDate).length, icon: Calendar, color: 'orange' }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPaymentType = paymentTypeFilter === 'All' || account.paymentType === paymentTypeFilter;
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
    return matchesSearch && matchesPaymentType && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = filteredAccounts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      }`}>
        {status}
      </span>
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / SUB-CONTRACTOR ACCOUNT SUMMARY</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all sub-contractor accounts and their details</p>
          </div>
          <div className="flex gap-1">
            <button className="fixed right-8 top-18 bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105
              dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white">
              <Plus size={20} />
              ADD NEW
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
              green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
              purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
              orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
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

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search sub-contractors..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
              
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentTypeFilter}
                onChange={(e) => {
                  setPaymentTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Payment Types</option>
                <option value="Credit">Credit</option>
                <option value="Cash">Cash</option>
              </select>

              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button 
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setPaymentTypeFilter('All');
                  setStatusFilter('All');
                  setCurrentPage(1);
                }}
              >
                Reset
              </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                             <Download size={18} />
                             Export CSV
                           </button>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Account Payable</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">PJ Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Payment Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Job Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAccounts.map((account, index) => (
                  <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <span className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer">
                        {account.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{account.accountPayable || '-'}</td>
                    <td className="py-4 px-6 text-gray-700">{account.pjNumber || '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        account.paymentType === 'Credit' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {account.paymentType || '-'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{account.jobDate}</td>
                    <td className="py-4 px-6">{getStatusBadge(account.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150">
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
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAccounts.length)} of {filteredAccounts.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubContractorAccountSummary;