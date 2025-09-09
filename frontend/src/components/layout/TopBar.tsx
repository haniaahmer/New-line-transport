import React, { useState } from "react";
import {
  Bell,
  Search,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

// Static translation object for English and Arabic
const translations = {
  en: {
    searchPlaceholder: "Search",
    notifications: "Notifications",
    notification1: {
      title: "New booking assigned",
      description: "Sarah Johnson — Airport pickup at 2:00 PM",
    },
    notification2: {
      title: "Driver status update",
      description: "John Smith marked as available",
    },
    notification3: {
      title: "Payment received",
      description: "$245.50 from TechCorp Inc.",
    },
    userName: "Admin User",
    userEmail: "admin@logistifie.com",
    profile: "Profile",
    settings: "Settings",
    signOut: "Sign out",
    switchToDarkMode: "Switch to dark mode",
    switchToLightMode: "Switch to light mode",
  },
  ar: {
    searchPlaceholder: "بحث",
    notifications: "الإشعارات",
    notification1: {
      title: "تم تعيين حجز جديد",
      description: "سارة جونسون — توصيل إلى المطار الساعة 2:00 مساءً",
    },
    notification2: {
      title: "تحديث حالة السائق",
      description: "جون سميث تم تعيينه كمتاح",
    },
    notification3: {
      title: "تم استلام الدفعة",
      description: "245.50 دولار من تك كورب إنك.",
    },
    userName: "مستخدم الإدارة",
    userEmail: "admin@logistifie.com",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    signOut: "تسجيل الخروج",
    switchToDarkMode: "التبديل إلى الوضع الداكن",
    switchToLightMode: "التبديل إلى الوضع الفاتح",
  },
};

const TopBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const t = translations[language]; // Get translations based on selected language

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center bg-white dark:bg-gray-800 px-4 lg:px-6 border-b border-gray-200 dark:border-gray-700 ${
        language === "ar" ? "font-arabic" : ""
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Left Section - Search */}
      <div className="flex items-center px-9 max-w-xl">
        <div className="relative flex-1">
          <div
            className={`absolute inset-y-0 ${
              language === "ar" ? "right-0 pr-3" : "left-0 pl-3"
            } flex items-center pointer-events-none`}
          >
            <Search className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
          <input
            placeholder={t.searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`pl-10 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full h-10 text-sm rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none ${
              language === "ar" ? "text-right" : ""
            }`}
          />
        </div>
      </div>

      {/* Right Section - Actions and User */}
      <div className="flex-1 flex items-center justify-end gap-6">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === "en" ? "English" : "العربية"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div
                className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleLanguageSelect("en")}
              >
                English
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleLanguageSelect("ar")}
              >
                العربية
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          aria-label={darkMode ? t.switchToLightMode : t.switchToDarkMode}
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
                <h3 className="font-medium text-gray-900 dark:text-white">{t.notifications}</h3>
              </div>
              <div className="space-y-2 p-2 max-h-60 overflow-y-auto">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.notification1.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.notification1.description}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.notification2.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.notification2.description}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.notification3.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.notification3.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.userEmail}</p>
                </div>
              </div>
              <div className="py-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  {t.profile}
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  {t.settings}
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.signOut}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showUserMenu || showLanguageMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
            setShowLanguageMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default TopBar;