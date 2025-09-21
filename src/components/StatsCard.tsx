import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend 
}) => {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-cyber-cyan/50 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUp className="w-4 h-4 text-cyber-green" />
            ) : (
              <ArrowDown className="w-4 h-4 text-cyber-red" />
            )}
            <span className={`text-sm ${isPositive ? 'text-cyber-green' : 'text-cyber-red'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-cyber-cyan/10 transition-colors">
          <Icon className="w-6 h-6 text-cyber-cyan" />
        </div>
      </div>
    </Card>
  );
};