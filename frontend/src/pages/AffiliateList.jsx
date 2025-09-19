import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, Building, Globe, Send, ChevronLeft, ChevronRight,X, } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const AffiliateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [operationFilter, setOperationFilter] = useState('All');
  const [invitationFilter, setInvitationFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('AFFILIATE LIST');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const affiliates = [
    { 
      id: 1,
      companyName: 'Global Travel Solutions',
      companyAddress: 'Dubai, United Arab Emirates',
      operationCenter: 'Middle East',
      canReceiveWork: true,
      canSendWork: true,
      status: 'Active',
      joinDate: '15/01/2024'
    },
    { 
      id: 2,
      companyName: 'European Tours & Transport',
      companyAddress: 'London, United Kingdom',
      operationCenter: 'Europe',
      canReceiveWork: true,
      canSendWork: false,
      status: 'Active',
      joinDate: '22/02/2024'
    },
    { 
      id: 3,
      companyName: 'Asia Pacific Logistics',
      companyAddress: 'Singapore, Singapore',
      operationCenter: 'Asia Pacific',
      canReceiveWork: false,
      canSendWork: true,
      status: 'Pending',
      joinDate: '10/03/2024'
    },
    { 
      id: 4,
      companyName: 'American Express Travel',
      companyAddress: 'New York, United personally, I would like to see these colors changed to match the other code providedUnited States',
      operationCenter: 'North America',
      canReceiveWork: true,
      canSendWork: true,
      status: 'Active',
      joinDate: '05/04/2024'
    },
    { 
      id: 5,
      companyName: 'Australian Travel Network',
      companyAddress: 'Sydney, Australia',
      operationCenter: 'Oceania',
      canReceiveWork: true,
      canSendWork: false,
      status: 'Inactive',
      joinDate: '18/05/2024'
    },
  ];


  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Inactive': 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}>
        {status}
      </span>
    );
  };

  const getInviteButton = (canReceive, affiliateId) => (
    <button
      onClick={() => handleInviteToReceive(affiliateId)}
      disabled={!canReceive}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
        canReceive
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 cursor-pointer'
          : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
      }`}
    >
      {canReceive ? 'Invite' : 'Not Available'}
    </button>
  );

  const getSendInviteButton = (canSend, affiliateId) => (
    <button
      onClick={() => handleInviteToSend(affiliateId)}
      disabled={!canSend}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
        canSend
          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/30 cursor-pointer'
          : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
      }`}
    >
      {canSend ? 'Invite' : 'Not Available'}
    </button>
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: 'S.No#',
      cell: (info) => <span className="text-gray-900 dark:text-white font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('companyName', {
      header: 'Company Name',
      cell: (info) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('companyAddress', {
      header: 'Company Address',
      cell: (info) => <span className="text-gray-700 dark:text-gray-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor('operationCenter', {
      header: 'Operation Center',
      cell: (info) => (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('canReceiveWork', {
      header: 'Invite to Receive Work',
      cell: (info) => getInviteButton(info.getValue(), info.row.original.id),
    }),
    columnHelper.accessor('canSendWork', {
      header: 'Invite to SEND Work',
      cell: (info) => getSendInviteButton(info.getValue(), info.row.original.id),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => getStatusBadge(info.getValue()),
    }),
  ];

  const filteredAffiliates = useMemo(
    () =>
      affiliates.filter((affiliate) => {
        const matchesSearch = affiliate.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             affiliate.companyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             affiliate.operationCenter.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOperation = operationFilter === 'All' || affiliate.operationCenter === operationFilter;
        const matchesInvitation = invitationFilter === 'All' ||
                                 (invitationFilter === 'Can Receive' && affiliate.canReceiveWork) ||
                                 (invitationFilter === 'Can Send' && affiliate.canSendWork) ||
                                 (invitationFilter === 'Both' && affiliate.canReceiveWork && affiliate.canSendWork);
        return matchesSearch && matchesOperation && matchesInvitation;
      }),
    [searchTerm, operationFilter, invitationFilter]
  );

  const table = useReactTable({
    data: filteredAffiliates,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  const resetFilters = () => {
    setSearchTerm('');
    setOperationFilter('All');
    setInvitationFilter('All');
    table.setPageIndex(0);
  };

  const handleInviteToReceive = (affiliateId) => {
    console.log('Invite to receive work:', affiliateId);
  };

  const handleInviteToSend = (affiliateId) => {
    console.log('Invite to send work:', affiliateId);
  };

  const handleInviteManually = () => {
    console.log('Invite manually');
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AMS / Affiliate Management</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Manage affiliate partners and invitation system</p>
            </div>
            <button
              onClick={handleInviteManually}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus size={20} />
              INVITE MANUALLY
            </button>
          </div>
        </div>

       
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('AFFILIATE LIST')}
              className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'AFFILIATE LIST'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              AFFILIATE LIST
            </button>
            <button
              onClick={() => setActiveTab('AFFILIATE REQUEST')}
              className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'AFFILIATE REQUEST'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              AFFILIATE REQUEST
            </button>
          </div>

          {/* Filters Container */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors duration-200"
                  onClick={resetFilters}
                >
                  <X size={16} />
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4 items-center flex-1 min-w-0">
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search partners..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        table.setPageIndex(0);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Operation Center</label>
                    <select
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={operationFilter}
                      onChange={(e) => {
                        setOperationFilter(e.target.value);
                        table.setPageIndex(0);
                      }}
                    >
                      <option value="All">All Operation Centers</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="North America">North America</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Invitation Type</label>
                    <select
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={invitationFilter}
                      onChange={(e) => setInvitationFilter(e.target.value)}
                    >
                      <option value="All">All Invitation Types</option>
                      <option value="Can Receive">Can Receive Work</option>
                      <option value="Can Send">Can Send Work</option>
                      <option value="Both">Both</option>
                    </select>
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
          </div>

          {/* Partners Available Banner */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-700 dark:text-blue-400 font-medium">
              PARTNERS AVAILABLE ACROSS THE WORLD
            </p>
          </div>

          {/* Table Container */}
          <div>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Partner List</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      filteredAffiliates.length
                    )} of {filteredAffiliates.length} partners
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                  <select
                    className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
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
                  <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={`text-left py-4 px-6 font-semibold text-gray-900 dark:text-white ${
                              header.id === 'id' ? 'min-w-[80px]' :
                              header.id === 'companyName' ? 'min-w-[200px]' :
                              header.id === 'companyAddress' ? 'min-w-[200px]' :
                              header.id === 'operationCenter' ? 'min-w-[150px]' :
                              header.id === 'canReceiveWork' ? 'min-w-[180px]' :
                              header.id === 'canSendWork' ? 'min-w-[180px]' :
                              header.id === 'status' ? 'min-w-[120px]' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center">
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: ' ↑',
                                desc: ' ↓',
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-4 px-6">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                    !table.getCanPreviousPage()
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                    !table.getCanNextPage()
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
      </div>
    </div>
  );
};

export default AffiliateList;