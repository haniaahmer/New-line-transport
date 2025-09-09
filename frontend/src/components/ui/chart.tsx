// Simple chart component for the dashboard
import React from 'react'

// This is a minimal chart component to avoid the complex type issues
// We'll use Recharts directly in components for now
export const ChartContainer: React.FC<{
  config?: any
  className?: string
  children: React.ReactNode
}> = ({ children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  )
}

export const useChart = () => {
  return { config: {} }
}