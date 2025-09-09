import React from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen, sidebarWidth } = useDashboardStore();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          !sidebarOpen && "ml-0",
          sidebarOpen && "md:ml-[var(--sidebar-width)]"
        )}
        style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
      >
        <TopBar />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 py-6 md:px-2 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;