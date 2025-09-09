import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Car, ChevronLeft, ChevronRight } from 'lucide-react';

const FleetDriver = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const drivers = [
    { id: 1, name: 'Ali Othman', grade: 'Standard', status: 'Active', address: '11484', joinDate: '01/06/2025', activeVehicles: 0, lastJobDate: '02/09/2025', holdBlockDate: null },
    { id: 2, name: 'Fayaz Khan', grade: 'Standard', status: 'Active', address: '12271', joinDate: '01/08/2025', activeVehicles: 0, lastJobDate: 'No Jobs', holdBlockDate: null },
    { id: 3, name: 'Hassan nasur', grade: 'Standard', status: 'Active', address: '11484', joinDate: '14/08/2025', activeVehicles: 0, lastJobDate: 'No Jobs', holdBlockDate: null },
    { id: 4, name: 'Kashif demo', grade: 'Standard', status: 'Active', address: '', joinDate: '', activeVehicles: 0, lastJobDate: '03/07/2025', holdBlockDate: null },
    { id: 5, name: 'Katongole Denis', grade: 'Standard', status: 'Active', address: '11451', joinDate: '01/07/2025', activeVehicles: 0, lastJobDate: '02/07/2025', holdBlockDate: null },
    { id: 6, name: 'Makajja William', grade: 'Standard', status: 'Active', address: '11481', joinDate: '', activeVehicles: 0, lastJobDate: '29/08/2025', holdBlockDate: null },
    { id: 7, name: 'Mohameed Sohail', grade: 'Standard', status: 'Active', address: '', joinDate: '01/06/2025', activeVehicles: 0, lastJobDate: '14/08/2025', holdBlockDate: null },
    { id: 8, name: 'Mohammed Afrasiab', grade: 'Standard', status: 'Active', address: '', joinDate: '01/06/2025', activeVehicles: 0, lastJobDate: '15/08/2025', holdBlockDate: null },
    { id: 9, name: 'Mohammed Selim', grade: 'VIP', status: 'Active', address: '11481', joinDate: '01/06/2025', activeVehicles: 0, lastJobDate: '02/06/2025', holdBlockDate: null },
    { id: 10, name: 'Othman Bakari', grade: 'Standard', status: 'Active', address: '11484', joinDate: '', activeVehicles: 0, lastJobDate: 'No Jobs', holdBlockDate: null },
    { id: 11, name: 'William Kamau', grade: 'VIP', status: 'Active', address: '11481', joinDate: '01/06/2025', activeVehicles: 0, lastJobDate: '03/07/2025', holdBlockDate: null },
    { id: 12, name: 'Zein said', grade: 'Standard', status: 'Active', address: '12271', joinDate: '14/08/2025', activeVehicles: 0, lastJobDate: '22/08/2025', holdBlockDate: null }
  ];

  const stats = [
    { title: 'Total Drivers', value: drivers.length, icon: Users, color: 'blue' },
    { title: 'Active Drivers', value: drivers.filter(d => d.status === 'Active').length, icon: Users, color: 'green' },
    { title: 'VIP Drivers', value: drivers.filter(d => d.grade === 'VIP').length, icon: Car, color: 'purple' },
    { title: 'Active Vehicles', value: drivers.reduce((sum, d) => sum + d.activeVehicles, 0), icon: Car, color: 'orange' }
  ];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || driver.grade === gradeFilter;
    const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fleet Driver Summary</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage all fleet drivers and their information</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105">
              <Plus size={20} />
              Add Driver
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

        {/* Filters Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1 min-w-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search drivers..."
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
                value={gradeFilter}
                onChange={(e) => {
                  setGradeFilter(e.target.value);
                  setCurrentPage(1);
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
                  setGradeFilter('All');
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

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Driver List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDrivers.length)} of {filteredDrivers.length} drivers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
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

          {/* Scrollable Table */}
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto hover:overflow-y-auto transition-all duration-300">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
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
                  {currentItems.map((driver) => (
                    <tr key={driver.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{driver.id}</td>
                      <td className="py-4 px-6">
                        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
                          {driver.name}
                        </span>
                      </td>
                      <td className="py-4 px-6">{getGradeBadge(driver.grade)}</td>
                      <td className="py-4 px-6">{getStatusBadge(driver.status)}</td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{driver.address || '-'}</td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{driver.joinDate || '-'}</td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{driver.activeVehicles}</td>
                      <td className="py-4 px-6">
                        <span className={`text-sm ${driver.lastJobDate === 'No Jobs' ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full' : 'text-gray-700 dark:text-gray-300'}`}>
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

          {/* Pagination Controls */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${currentPage === 1 
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              
              <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${currentPage === totalPages 
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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

export default FleetDriver;