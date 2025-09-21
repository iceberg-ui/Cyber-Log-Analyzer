import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Multiple Failed Login Attempts',
    description: 'Detected 15 failed attempts from IP 192.168.1.100',
    time: '2 min ago',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Unusual Network Traffic',
    description: 'Spike in outbound traffic to unknown servers',
    time: '5 min ago',
    acknowledged: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update Available',
    description: 'Security patch 2.4.1 ready for deployment',
    time: '1 hour ago',
    acknowledged: true,
  },
];

export const AlertsPanel: React.FC = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-cyber-red border-cyber-red/50 bg-cyber-red/10';
      case 'warning': return 'text-cyber-orange border-cyber-orange/50 bg-cyber-orange/10';
      case 'info': return 'text-cyber-cyan border-cyber-cyan/50 bg-cyber-cyan/10';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-cyber-orange" />
          Security Alerts
          <Badge variant="destructive" className="ml-auto">
            {mockAlerts.filter(a => !a.acknowledged).length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border transition-all ${
              alert.acknowledged ? 'opacity-50' : 'hover:scale-[1.02]'
            } ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start gap-2">
              {getAlertIcon(alert.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs opacity-80">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-60">{alert.time}</span>
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs"
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};