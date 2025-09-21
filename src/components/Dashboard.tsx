import React from 'react';
import { StatsCard } from './StatsCard';
import { LogViewer } from './LogViewer';
import { ThreatIndicator } from './ThreatIndicator';
import { ActivityChart } from './ActivityChart';
import { AlertsPanel } from './AlertsPanel';
import { SearchBar } from './SearchBar';
import { SecurityTimeline } from './SecurityTimeline';
import { Shield, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/cyber-hero.jpg';

export const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Logs', value: '45,892', change: '+12.5%', icon: Activity, trend: 'up' as const },
    { title: 'Security Events', value: '234', change: '+3.2%', icon: Shield, trend: 'up' as const },
    { title: 'Critical Alerts', value: '7', change: '-2', icon: AlertTriangle, trend: 'down' as const },
    { title: 'Resolved', value: '98.2%', change: '+0.5%', icon: CheckCircle, trend: 'up' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden mb-6">
        <img 
          src={heroImage} 
          alt="Cyber Security Operations Center" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-gradient-cyber mb-2">
              CYBER LOG ANALYZER
            </h1>
            <p className="text-lg text-muted-foreground">Real-time security monitoring and threat detection</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid gap-6">
        {/* Search Bar */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <SearchBar />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Log Viewer - Takes 2 columns */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <LogViewer />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <ThreatIndicator />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <AlertsPanel />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <ActivityChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <SecurityTimeline />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};