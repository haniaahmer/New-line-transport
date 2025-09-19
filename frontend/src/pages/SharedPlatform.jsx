import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2, X, Calendar, MapPin, Info, Truck, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

const SharedPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sharedPlatformData, setSharedPlatformData] = useState([
    { id: 1, jobId: 'JOB001', dateTime: '2025-09-10T12:00', pickUp: 'London', dropOff: 'Manchester', additionalInfo: 'Priority delivery', vehicleName: 'Van A', price: '150' },
    { id: 2, jobId: 'JOB002', dateTime: '2025-09-11T14:30', pickUp: 'Birmingham', dropOff: 'Leeds', additionalInfo: 'Fragile goods', vehicleName: 'Van B', price: '200' },
    { id: 3, jobId: 'JOB003', dateTime: '2025-09-12T09:15', pickUp: 'Liverpool', dropOff: 'Bristol', additionalInfo: 'Express service', vehicleName: 'Truck C', price: '300' },
  ]);

  const [newJob, setNewJob] = useState({
    jobId: '',
    dateTime: '',
    pickUp: '',
    dropOff: '',
    additionalInfo: '',
    vehicleName: '',
    price: ''
  });

  const handleAddJob = () => {
    setEditingJob(null);
    setNewJob({
      jobId: '',
      dateTime: '',
      pickUp: '',
      dropOff: '',
      additionalInfo: '',
      vehicleName: '',
      price: ''
    });
    setShowAddJobModal(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setNewJob({...job});
    setShowAddJobModal(true);
  };

  const handleDelete = (jobId) => {
    setDeleteConfirm(jobId);
  };

  const confirmDelete = () => {
    setSharedPlatformData(sharedPlatformData.filter(job => job.id !== deleteConfirm));
    setDeleteConfirm(null);
  };

  const handleCloseModal = () => {
    setShowAddJobModal(false);
    setEditingJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingJob) {
      setSharedPlatformData(sharedPlatformData.map(job => 
        job.id === editingJob.id ? {...newJob, id: editingJob.id} : job
      ));
    } else {
      const jobToAdd = {
        id: Math.max(...sharedPlatformData.map(job => job.id), 0) + 1,
        ...newJob
      };
      setSharedPlatformData([...sharedPlatformData, jobToAdd]);
    }
    
    handleCloseModal();
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
    alert('CSV export functionality would be implemented here');
  };

  const filteredJobs = sharedPlatformData.filter(job =>
    job.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.pickUp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.dropOff.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredJobs.length / pagination.pageSize);
  const paginatedJobs = filteredJobs.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(prev.pageIndex - 1, 0),
    }));
  };

  const handleNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(prev.pageIndex + 1, pageCount - 1),
    }));
  };

  const handlePageSizeChange = (e) => {
    setPagination({
      pageIndex: 0,
      pageSize: Number(e.target.value),
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPagination({ pageIndex: 0, pageSize: 5 });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Shared Platform</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage shared booking jobs and details</p>
            </div>
            <button
              onClick={handleAddJob}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
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
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }}
                />
              </div>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Job List</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Showing {pagination.pageIndex * pagination.pageSize + 1}-
                  {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredJobs.length)} of {filteredJobs.length} jobs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={pagination.pageSize}
                  onChange={handlePageSizeChange}
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
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">S.No#</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Job Id</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Date & Time</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Pick Up</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Drop Off</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Additional Info</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Vehicle Name</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Price</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                      >
                        <td className="py-4 px-4 md:px-6">{job.id}</td>
                        <td className="py-4 px-4 md:px-6 font-medium">{job.jobId}</td>
                        <td className="py-4 px-4 md:px-6">{formatDateTime(job.dateTime)}</td>
                        <td className="py-4 px-4 md:px-6">{job.pickUp}</td>
                        <td className="py-4 px-4 md:px-6">{job.dropOff}</td>
                        <td className="py-4 px-4 md:px-6">{job.additionalInfo}</td>
                        <td className="py-4 px-4 md:px-6">{job.vehicleName}</td>
                        <td className="py-4 px-4 md:px-6">${job.price}</td>
                        <td className="py-4 px-4 md:px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(job)}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
                              aria-label="Edit job"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
                              aria-label="Delete job"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="py-8 text-center text-gray-500 dark:text-gray-400">
                        No jobs found. {sharedPlatformData.length === 0 ? 'Add your first job using the "Add Job" button.' : 'Try adjusting your search.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Page {pagination.pageIndex + 1} of {pageCount}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.pageIndex === 0}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  pagination.pageIndex === 0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={pagination.pageIndex >= pageCount - 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  pagination.pageIndex >= pageCount - 1
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
      </div>

      {/* Add/Edit Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <Truck size={16} />
                    Job ID
                  </label>
                  <input
                    type="text"
                    name="jobId"
                    value={newJob.jobId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    placeholder="e.g., JOB001"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <Calendar size={16} />
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={newJob.dateTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <MapPin size={16} />
                    Pick Up Location
                  </label>
                  <input
                    type="text"
                    name="pickUp"
                    value={newJob.pickUp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    placeholder="e.g., London"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <MapPin size={16} />
                    Drop Off Location
                  </label>
                  <input
                    type="text"
                    name="dropOff"
                    value={newJob.dropOff}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    placeholder="e.g., Manchester"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <Truck size={16} />
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={newJob.vehicleName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    placeholder="e.g., Van A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <DollarSign size={16} />
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newJob.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    placeholder="e.g., 150"
                    min="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <Info size={16} />
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={newJob.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Any special instructions or notes"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {editingJob ? 'Update Job' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedPlatform;