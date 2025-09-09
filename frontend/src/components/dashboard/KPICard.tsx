import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  gradient?: 'primary' | 'success' | 'warning' | 'accent';
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  gradient = 'primary',
  className 
}: KPICardProps) => {
  const isPositiveTrend = trend && trend > 0;
  
  const gradientClasses = {
    primary: 'gradient-primary',
    success: 'gradient-success', 
    warning: 'bg-warning',
    accent: 'bg-accent'
  };

  return (
    <Card className={cn("relative overflow-hidden shadow-elegant", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend !== undefined && (
              <div className="flex items-center gap-1">
                {isPositiveTrend ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  isPositiveTrend ? "text-success" : "text-destructive"
                )}>
                  {Math.abs(trend)}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            gradientClasses[gradient]
          )}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;