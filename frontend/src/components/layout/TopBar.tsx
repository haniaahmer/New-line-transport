import React, { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const TopBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-white dark:bg-gray-800 px-4 lg:px-6 border-b border-gray-200 dark:border-gray-700">
      {/* Left Section - Search */}
      <div className="flex items-center px-9 max-w-xl">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
          <input
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full h-10 text-sm rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Right Section - Actions and User */}
      <div className="flex-1 flex items-center justify-end gap-6">
        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors relative"
          >
            <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="space-y-2 p-2 max-h-60 overflow-y-auto">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New booking assigned</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sarah Johnson — Airport pickup at 2:00 PM
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Driver status update</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    John Smith marked as available
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Payment received</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    $245.50 from TechCorp Inc.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-medium text-sm">
              AU
            </div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@logistifie.com
                  </p>
                </div>
              </div>
              
              <div className="py-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside handler */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default TopBar;