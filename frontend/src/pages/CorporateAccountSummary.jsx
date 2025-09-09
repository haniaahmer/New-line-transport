import React, { useState } from 'react';
import { Search, Download, Plus, Edit, Trash2, Users, CreditCard, Calendar, Building } from 'lucide-react';

const CorporateAccountSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const accounts = [
    { 
      id: 2246, 
      name: 'Ilhea', 
      officeAddress: '', 
      email: 'ABDULLAH.H@TTHRACAR.COM.SA', 
      accountType: 'Credit Account', 
      cnpjNumber: '0.3a', 
      creditLimit: '', 
      salesPlan: '', 
      lastJobDate: '21/07/2025', 
      status: 'Active' 
    },
    { 
      id: 2185, 
      name: 'KIMPTON', 
      officeAddress: 'KAFD, 1st (الرئيس السريع)', 
      email: 'info@kimpton.sa', 
      accountType: 'Credit Account', 
      cnpjNumber: '0.3a', 
      creditLimit: '', 
      salesPlan: '', 
      lastJobDate: '02/09/2025', 
      status: 'Active' 
    },
    { 
      id: 2158, 
      name: 'Intercontinental(tah)', 
      officeAddress: 'Riyadh', 
      email: 'inter@inter.com', 
      accountType: 'Credit Account', 
      cnpjNumber: '0.3a', 
      creditLimit: '', 
      salesPlan: '', 
      lastJobDate: '15/08/2025', 
      status: 'Active' 
    },
  ];

  const stats = [
    { title: 'Total Accounts', value: accounts.length, icon: Users, color: 'blue' },
    { title: 'Active Accounts', value: accounts.filter(a => a.status === 'Active').length, icon: CreditCard, color: 'green' },
    { title: 'Credit Accounts', value: accounts.filter(a => a.accountType === 'Credit Account').length, icon: Building, color: 'purple' },
    { title: 'Recent Jobs', value: accounts.filter(a => a.lastJobDate).length, icon: Calendar, color: 'orange' }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccountType = accountTypeFilter === 'All' || account.accountType === accountTypeFilter;
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
    return matchesSearch && matchesAccountType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      }`}>
        {status}
      </span>
    );
  };

  const getAccountTypeBadge = (type) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        type === 'Credit Account' 
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' 
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
      }`}>
        {type}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AMS / CORPORATE ACCOUNT SUMMARY</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all corporate accounts and their details</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
              green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300',
              purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300',
              orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300'
            };
            
            return (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
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
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                value={accountTypeFilter}
                onChange={(e) => setAccountTypeFilter(e.target.value)}
              >
                <option value="All">All Account Types</option>
                <option value="Credit Account">Credit Account</option>
                <option value="Other">Other</option>
              </select>

              <select
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button 
                className="px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setAccountTypeFilter('All');
                  setStatusFilter('All');
                }}
              >
                Reset
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors duration-200">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Office Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Email Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Account Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">CNPJ Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Credit Limit</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Sales Plan</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Last Job Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, index) => (
                  <tr key={account.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-primary font-medium hover:text-primary/80 cursor-pointer">
                          {account.id}
                        </span>
                        <div className="text-foreground font-medium">{account.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{account.officeAddress || '-'}</td>
                    <td className="py-4 px-6 text-muted-foreground">{account.email}</td>
                    <td className="py-4 px-6">{getAccountTypeBadge(account.accountType)}</td>
                    <td className="py-4 px-6 text-muted-foreground">{account.cnpjNumber}</td>
                    <td className="py-4 px-6 text-muted-foreground">{account.creditLimit || '-'}</td>
                    <td className="py-4 px-6 text-muted-foreground">{account.salesPlan || '-'}</td>
                    <td className="py-4 px-6 text-muted-foreground">{account.lastJobDate}</td>
                    <td className="py-4 px-6">{getStatusBadge(account.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-150">
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
        <div className="mt-6 flex justify-between items-center">
          <div className="text-muted-foreground">
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Floating Add New Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105
        dark:bg-red-700 dark:hover:bg-red-800 dark:text-white"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
      >
        <Plus size={20} />
        Add New
      </button>
    </div>
  );
};

export default CorporateAccountSummary;