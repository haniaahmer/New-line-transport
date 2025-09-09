import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Car, CheckCircle, Calendar } from 'lucide-react';

const OwnerDriver = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const drivers = [
    { id: 1, name: 'Demo Hitik', grade: 'Standard', status: 'Active', address: '1234', joinDate: '01/03/2024', activeVehicles: 1, lastJobDate: '20/06/2025', holdBlockDate: null },
  ];

  const stats = [
    { title: 'Total Owner Drivers', value: drivers.length, icon: Users, color: 'blue' },
    { title: 'Active Drivers', value: drivers.filter(d => d.status === 'Active').length, icon: CheckCircle, color: 'green' },
    { title: 'Total Active Vehicles', value: drivers.reduce((sum, d) => sum + d.activeVehicles, 0), icon: Car, color: 'purple' },
    { title: 'Recent Jobs', value: drivers.filter(d => d.lastJobDate !== 'No Jobs').length, icon: Calendar, color: 'orange' }
  ];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || driver.grade === gradeFilter;
    const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

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

  const getGradeBadge = (grade) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        grade === 'VIP' 
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      }`}>
        {grade}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Owner Driver Summary</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all owner drivers and their vehicles</p>
          </div>
          <button className="fixed right-8 top-18 bg-blue-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105
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
                  placeholder="Search drivers..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="All">All Grades</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
              </select>

              <select
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button 
                className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setGradeFilter('All');
                  setStatusFilter('All');
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

        {/* Drivers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Sl.No.</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Driver's Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Grade</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Profile Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Driver Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Company Joining Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Active Vehicles</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Last Job Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Hold/Block Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver, index) => (
                  <tr key={driver.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="py-4 px-6 text-gray-900 dark:text-white">{driver.id}</td>
                    <td className="py-4 px-6">
                      <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
                        {driver.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">{getGradeBadge(driver.grade)}</td>
                    <td className="py-4 px-6">{getStatusBadge(driver.status)}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{driver.address}</td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{driver.joinDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{driver.activeVehicles}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${
                        driver.lastJobDate === 'No Jobs' 
                          ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20 px-2 py-1 rounded-full' 
                          : 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 px-2 py-1 rounded-full'
                      }`}>
                        {driver.lastJobDate}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{driver.holdBlockDate || '-'}</td>
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

        {/* Results Summary */}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Showing {filteredDrivers.length} of {drivers.length} owner drivers
        </div>
      </div>
    </div>
  );
};

export default OwnerDriver;