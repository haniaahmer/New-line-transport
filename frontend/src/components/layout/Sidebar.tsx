import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Car,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  Truck,
  ChevronDown,
  ChevronUp,
  Menu,
  Target,
  Handshake,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/stores/dashboardStore";
import { cn } from "@/lib/utils";
import logoImage from "../../assets/logo.png";

interface NavigationItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: { name: string; href: string }[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Dispatch", href: "/dispatch", icon: Truck },
  { name: "Shared Platform", href: "/shared-platform", icon: Users },
  { name: "Cleared Bookings", href: "/cleared-bookings", icon: CheckCircle },
  {
    name: "Clients",
    icon: Users,
    children: [
      { name: "Corporate", href: "/clients/corporate" },
      { name: "Individual", href: "/clients/individual" },
      { name: "Subcontractor", href: "/clients/subcontractor" },
    ],
  },
  {
    name: "Drivers",
    icon: Car,
    children: [
      { name: "Fleet Driver", href: "/drivers/fleet" },
      { name: "Fleet Vehicle", href: "/drivers/fleet-vehicle" },
      { name: "Owner Driver", href: "/drivers/owner" },
      { name: "Subcontractor", href: "/drivers/subcontractor" },
    ],
  },
  {
    name: "CRM",
    icon: Target,
    children: [{ name: "Salesman Summary", href: "/crm/salesman-summary" }],
  },
  {
    name: "Finance",
    icon: DollarSign,
    children: [
      { name: "Finance Report", href: "/finance/report" },
      { name: "Invoice Summary", href: "/finance/invoice-summary" },
      { name: "Archived Invoice", href: "/finance/archived" },
      { name: "Generate Invoice", href: "/finance/generate" },
      { name: "Payment Link Summary", href: "/finance/payment-link" },
      { name: "Driver Payment Summary", href: "/finance/driver-payment" },
      { name: "Refund Summary", href: "/finance/refunds" },
    ],
  },
  {
    name: "Affiliate",
    icon: Handshake,
    children: [
      { name: "Affiliate List", href: "/affiliate/list" },
    ],
  },
  {
    name: "Compliance",
    icon: Shield,
    children: [
      { name: "TFL Report Summary", href: "/compliance/tfl-report" },
      { name: "Service Failure Reports", href: "/compliance/service-failure" },
      { name: "Complaints", href: "/compliance/complaints" },
      { name: "Lost Property", href: "/compliance/lost-property" },
      { name: "TFL Staff Register", href: "/compliance/tfl-staff" },
      { name: "London TFL Weekly Report", href: "/compliance/london-tfl-weekly" },
    ],
  },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    toggleSidebar,
    sidebarCollapsed,
    toggleSidebarCollapse,
    sidebarWidth,
  } = useDashboardStore();

  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [name] // Only one dropdown open at a time when collapsed
    );
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setOpenDropdowns([]);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarCollapsed && openDropdowns.length > 0) {
        const target = event.target as HTMLElement;
        const sidebar = document.querySelector('[aria-label="Sidebar navigation"]');
        if (sidebar && !sidebar.contains(target)) {
          closeAllDropdowns();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarCollapsed, openDropdowns, closeAllDropdowns]);

  useEffect(() => {
    const newWidth = sidebarCollapsed ? 64 : 240;
    useDashboardStore.getState().setSidebarWidth(newWidth);
    
    // Close all dropdowns when sidebar is expanded
    if (!sidebarCollapsed) {
      setOpenDropdowns([]);
    }
  }, [sidebarCollapsed]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-800 dark:bg-gray-700 transition-all duration-300 md:translate-x-0 overflow-visible shadow-sm border-r border-gray-300 dark:border-gray-600"
        )}
        style={{ width: `${sidebarWidth}px` }}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-600">
          <div 
            className="flex items-center gap-3 min-w-0 cursor-pointer"
            onClick={toggleSidebarCollapse}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src={logoImage} 
                alt="NEWLINE Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex flex-col">
                <h3 className="text-xl font-bold text-white dark:text-white">NEWLINE</h3>
                <h4 className="text-sm font-medium text-gray-100 dark:text-gray-200">Transport Company</h4>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!sidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebarCollapse}
                className="hidden md:flex h-8 w-8 p-0 hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <Menu className="h-6 w-6 text-white dark:text-gray-200" />
              </Button>
            )}
          </div>
        </div>

        <nav
          className={cn(
            "flex-1 py-6 space-y-2 overflow-y-auto hover-scrollbar",
            sidebarCollapsed ? "px-2" : "px-4"
          )}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isOpen = openDropdowns.includes(item.name);
              return (
                <div 
                  key={item.name}
                  className="relative"
                >
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={cn(
                      "flex items-center w-full gap-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                      sidebarCollapsed
                        ? "px-2 py-2.5 justify-center"
                        : "px-3 py-2.5",
                      "text-white hover:bg-yellow-100 dark:hover:bg-yellow-900/20 hover:text-gray-900 dark:hover:text-yellow-400"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`dropdown-${item.name}`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    {Icon && (
                      <Icon className="h-5 w-5 flex-shrink-0 text-white dark:text-gray-200" aria-hidden="true" />
                    )}
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left">{item.name}</span>
                    )}
                    {!sidebarCollapsed &&
                      (isOpen ? (
                        <ChevronUp className="h-4 w-4 ml-auto text-gray-100 dark:text-gray-200" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-auto text-gray-100 dark:text-gray-200" aria-hidden="true" />
                      ))}
                  </button>

                  {isOpen && (
                    <div 
                      id={`dropdown-${item.name}`} 
                      className={cn(
                        "absolute bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700",
                        sidebarCollapsed 
                          ? "left-full top-0 ml-2 min-w-48" 
                          : "ml-8 mt-1 relative w-full"
                      )}
                      style={sidebarCollapsed ? { 
                        position: 'fixed',
                        left: `${sidebarWidth + 8}px`,
                        top: 'auto'
                      } : {}}
                    >
                      {item.children.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              "block px-4 py-2 text-sm transition-all",
                              isActive
                                ? "bg-yellow-100 dark:bg-yellow-900/20 text-gray-900 dark:text-yellow-400 font-medium"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )
                          }
                          onClick={() => sidebarCollapsed && closeAllDropdowns()}
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                    sidebarCollapsed
                      ? "px-2 py-2.5 justify-center"
                      : "px-3 py-2.5",
                    isActive
                      ? "bg-yellow-100 dark:bg-yellow-900/20 text-gray-900 dark:text-yellow-400 shadow-sm border-r-2 border-yellow-500 dark:border-yellow-400"
                      : "text-white hover:bg-yellow-100 dark:hover:bg-yellow-900/20 hover:text-gray-900 dark:hover:text-yellow-400"
                  )
                }
                title={sidebarCollapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-yellow-600 dark:text-yellow-400" : "text-white dark:text-gray-200"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {!sidebarCollapsed && (
                      <span className="flex-1">{item.name}</span>
                    )}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-600 text-white dark:text-gray-200 text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;