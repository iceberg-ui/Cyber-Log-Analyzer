import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { time: '00:00', normal: 400, suspicious: 24, critical: 2 },
  { time: '04:00', normal: 300, suspicious: 13, critical: 1 },
  { time: '08:00', normal: 600, suspicious: 98, critical: 8 },
  { time: '12:00', normal: 800, suspicious: 120, critical: 12 },
  { time: '16:00', normal: 1200, suspicious: 180, critical: 15 },
  { time: '20:00', normal: 900, suspicious: 140, critical: 9 },
  { time: '24:00', normal: 500, suspicious: 60, critical: 4 },
];

export const ActivityChart: React.FC = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyber-cyan" />
          Security Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(30, 100%, 50%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(30, 100%, 50%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 90%, 50%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(0, 90%, 50%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 15%, 12%)" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(180, 50%, 60%)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(180, 50%, 60%)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(240, 15%, 8%)', 
                border: '1px solid hsl(180, 100%, 50%)',
                borderRadius: '8px'
              }}
            />
            <Area type="monotone" dataKey="critical" stackId="1" stroke="hsl(0, 90%, 50%)" fill="url(#colorCritical)" />
            <Area type="monotone" dataKey="suspicious" stackId="1" stroke="hsl(30, 100%, 50%)" fill="url(#colorSuspicious)" />
            <Area type="monotone" dataKey="normal" stackId="1" stroke="hsl(180, 100%, 50%)" fill="url(#colorNormal)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-cyan" />
            <span className="text-xs text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-orange" />
            <span className="text-xs text-muted-foreground">Suspicious</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-red" />
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};