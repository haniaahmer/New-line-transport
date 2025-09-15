import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2 } from 'lucide-react';

const SharedPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data (you can replace this with your actual data)
  const sharedPlatformData = [
    { id: 1, jobId: 'JOB123', dateTime: '2025-09-10 12:00', pickUp: 'London', dropOff: 'Manchester', additionalInfo: 'Priority', vehicleName: 'Van A', price: '$150' },
    // Add more data as needed
  ];

  const handleAddJob = () => {
    console.log('Add new job');
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  const handleEdit = (jobId) => {
    console.log('Edit job:', jobId);
  };

  const handleDelete = (jobId) => {
    console.log('Delete job:', jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shared Platform</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage shared booking jobs and details</p>
            </div>
            <button
              onClick={handleAddJob}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Plus size={20} />
              Add Job
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
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto hover:overflow-y-auto transition-all duration-300">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[80px]">S.No#</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Job Id</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Date & Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Pick Up</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Drop Off</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Additional Info</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[150px]">Vehicle Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[120px]">Price</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white min-w-[100px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sharedPlatformData.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">{job.id}</td>
                      <td className="py-4 px-6">{job.jobId}</td>
                      <td className="py-4 px-6">{job.dateTime}</td>
                      <td className="py-4 px-6">{job.pickUp}</td>
                      <td className="py-4 px-6">{job.dropOff}</td>
                      <td className="py-4 px-6">{job.additionalInfo}</td>
                      <td className="py-4 px-6">{job.vehicleName}</td>
                      <td className="py-4 px-6">{job.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(job.id)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
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
        </div>
      </div>
    </div>
  );
};

export default SharedPlatform;