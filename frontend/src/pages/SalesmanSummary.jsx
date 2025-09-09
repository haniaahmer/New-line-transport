import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Target, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const SalesmanSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [performanceFilter, setPerformanceFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const salesmen = [
    { 
      id: 1, 
      name: 'John Smith', 
      phone: '+1 (555) 123-4567', 
      email: 'john.smith@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 125000, 
      totalLeads: 45, 
      conversionRate: '27.8%',
      joinDate: '15/03/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      phone: '+1 (555) 234-5678', 
      email: 'sarah.j@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 89000, 
      totalLeads: 38, 
      conversionRate: '23.7%',
      joinDate: '22/05/2024',
      lastActivity: '01/09/2025'
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      phone: '+1 (555) 345-6789', 
      email: 'michael.chen@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 142000, 
      totalLeads: 52, 
      conversionRate: '30.2%',
      joinDate: '08/02/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 4, 
      name: 'Emily Rodriguez', 
      phone: '+1 (555) 456-7890', 
      email: 'emily.r@company.com', 
      status: 'Active', 
      performance: 'Average', 
      totalSales: 67000, 
      totalLeads: 31, 
      conversionRate: '19.4%',
      joinDate: '17/07/2024',
      lastActivity: '31/08/2025'
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      phone: '+1 (555) 567-8901', 
      email: 'david.wilson@company.com', 
      status: 'Inactive', 
      performance: 'Poor', 
      totalSales: 28000, 
      totalLeads: 25, 
      conversionRate: '12.0%',
      joinDate: '03/01/2024',
      lastActivity: '15/08/2025'
    },
    { 
      id: 6, 
      name: 'Lisa Taylor', 
      phone: '+1 (555) 678-9012', 
      email: 'lisa.t@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 95000, 
      totalLeads: 42, 
      conversionRate: '25.6%',
      joinDate: '29/04/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 7, 
      name: 'Robert Brown', 
      phone: '+1 (555) 789-0123', 
      email: 'robert.b@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 110000, 
      totalLeads: 48, 
      conversionRate: '26.9%',
      joinDate: '12/06/2024',
      lastActivity: '02/09/2025'
    },
    { 
      id: 8, 
      name: 'Jennifer Lee', 
      phone: '+1 (555) 890-1234', 
      email: 'jennifer.lee@company.com', 
      status: 'Active', 
      performance: 'Good', 
      totalSales: 82000, 
      totalLeads: 36, 
      conversionRate: '22.8%',
      joinDate: '05/09/2024',
      lastActivity: '01/09/2025'
    },
    { 
      id: 9, 
      name: 'Thomas Moore', 
      phone: '+1 (555) 901-2345', 
      email: 'thomas.m@company.com', 
      status: 'Inactive', 
      performance: 'Average', 
      totalSales: 45000, 
      totalLeads: 29, 
      conversionRate: '17.2%',
      joinDate: '20/11/2024',
      lastActivity: '20/08/2025'
    },
    { 
      id: 10, 
      name: 'Amanda Clark', 
      phone: '+1 (555) 012-3456', 
      email: 'amanda.c@company.com', 
      status: 'Active', 
      performance: 'Excellent', 
      totalSales: 135000, 
      totalLeads: 50, 
      conversionRate: '29.5%',
      joinDate: '14/02/2024',
      lastActivity: '02/09/2025'
    }
  ];

  const stats = [
    { title: 'Total Salesmen', value: salesmen.length, icon: Users, color: 'blue' },
    { title: 'Active Salesmen', value: salesmen.filter(s => s.status === 'Active').length, icon: Target, color: 'green' },
    { title: 'Top Performers', value: salesmen.filter(s => s.performance === 'Excellent').length, icon: Target, color: 'purple' },
    { title: 'Total Sales', value: `$${salesmen.reduce((sum, s) => sum + s.totalSales, 0).toLocaleString()}`, icon: Users, color: 'orange' }
  ];

  const filteredSalesmen = salesmen.filter(salesman => {
    const matchesSearch = salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salesman.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salesman.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || salesman.status === statusFilter;
    const matchesPerformance = performanceFilter === 'All' || salesman.performance === performanceFilter;
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSalesmen.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSalesmen = filteredSalesmen.slice(startIndex, startIndex + itemsPerPage);

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

  const getPerformanceBadge = (performance) => {
    const performanceColors = {
      'Excellent': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Good': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Average': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Poor': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${performanceColors[performance]}`}>
        {performance}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / SALESMAN SUMMARY</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all sales personnel and their performance metrics</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-destructive/90 hover:scale-105
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
                  placeholder="Search salesmen..."
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

              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={performanceFilter}
                onChange={(e) => {
                  setPerformanceFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Performance</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>

              <button 
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setPerformanceFilter('All');
                  setCurrentPage(1);
                }}
              >
                Reset
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Salesmen Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Salesman Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Phone Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Email Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Performance</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Total Sales</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Total Leads</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Conversion Rate</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Last Activity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSalesmen.map((salesman, index) => (
                  <tr key={salesman.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="py-4 px-6 text-gray-900 dark:text-white">{salesman.id}</td>
                    <td className="py-4 px-6">
                      <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
                        {salesman.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                        {salesman.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                        {salesman.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(salesman.status)}</td>
                    <td className="py-4 px-6">{getPerformanceBadge(salesman.performance)}</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{formatCurrency(salesman.totalSales)}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{salesman.totalLeads}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">{salesman.conversionRate}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{salesman.joinDate}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{salesman.lastActivity}</td>
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSalesmen.length)} of {filteredSalesmen.length} entries
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

export default SalesmanSummary;