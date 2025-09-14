import React, { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen, sidebarWidth } = useDashboardStore();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div 
      className="flex min-h-screen w-full bg-background"
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <Sidebar />
      
      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarOpen && "md:ml-[var(--sidebar-width)]",
          !sidebarOpen && "ml-0"
        )}
      >
        <TopBar />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 py-6 md:px-2 md:py-4 lg:px-1 lg:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;