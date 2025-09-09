import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, CreditCard, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

const PersonalAccountSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const accounts = [
    { 
      id: 7567, 
      name: 'Alim sala', 
      homeAddress: '', 
      email: 'bin@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 6601, 
      name: 'Demo Passenger', 
      homeAddress: '', 
      email: 'nevline@gmail.com', 
      paymentType: '$0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '20/08/2025', 
      status: 'Active' 
    },
    { 
      id: 7486, 
      name: 'MISFER ALDOSSAKI', 
      homeAddress: '', 
      email: 'maldosny@hotmail.com', 
      paymentType: '0.3p', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 7646, 
      name: 'Test Job', 
      homeAddress: '', 
      email: 'tabassum.logatifie@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 8527, 
      name: 'Test Test', 
      homeAddress: '', 
      email: 'test@test.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 7424, 
      name: 'all all', 
      homeAddress: '', 
      email: '6p112211@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
    { 
      id: 8651, 
      name: 'all all', 
      homeAddress: '', 
      email: 'ar@az.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '20/08/2025', 
      status: 'Active' 
    },
    { 
      id: 8048, 
      name: 'all mohamed', 
      homeAddress: '', 
      email: 'al@mail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: '12/07/2025', 
      status: 'Active' 
    },
    { 
      id: 7568, 
      name: 'iff ifff', 
      homeAddress: '', 
      email: 'mmm@gmail.com', 
      paymentType: '£0', 
      creditLimit: '', 
      salesman: '', 
      lastJobDate: 'No Jobs', 
      status: 'Active' 
    },
  ];

  const stats = [
    { title: 'Total Personal Accounts', value: accounts.length, icon: Users, color: 'blue' },
    { title: 'Active Accounts', value: accounts.filter(a => a.status === 'Active').length, icon: CreditCard, color: 'green' },
    { title: 'Accounts with Jobs', value: accounts.filter(a => a.lastJobDate !== 'No Jobs').length, icon: Calendar, color: 'purple' },
    { title: 'Different Payment Types', value: new Set(accounts.map(a => a.paymentType)).size, icon: User, color: 'orange' }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getLastJobDateBadge = (date) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        date === 'No Jobs' 
          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' 
          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      }`}>
        {date}
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / PERSONAL ACCOUNT SUMMARY</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all personal accounts and their details</p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105
            dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white">
            <Plus size={20} />
            Add New
          </button>
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
                  placeholder="Search accounts..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
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
                <option value="£0">£0</option>
                <option value="$0">$0</option>
                <option value="0.3p">0.3p</option>
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
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setPaymentTypeFilter('All');
                  setStatusFilter('All');
                  setCurrentPage(1);
                }}
              >
                Reset
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Home Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Email Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Payment Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Credit Limit</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Salesman</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Last Job Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAccounts.map((account, index) => (
                  <tr key={account.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
                          {account.id}
                        </span>
                        <div className="text-gray-900 dark:text-white font-medium">{account.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{account.homeAddress || '-'}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{account.email}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {account.paymentType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{account.creditLimit || '-'}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{account.salesman || '-'}</td>
                    <td className="py-4 px-6">{getLastJobDateBadge(account.lastJobDate)}</td>
                    <td className="py-4 px-6">{getStatusBadge(account.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150">
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
          <div className="text-gray-600 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAccounts.length)} of {filteredAccounts.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PersonalAccountSummary;