import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimelineEvent {
  id: string;
  time: string;
  type: 'security' | 'alert' | 'success' | 'error';
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    time: '09:45 AM',
    type: 'security',
    title: 'Firewall Rule Updated',
    description: 'Added new IP range to blocklist',
  },
  {
    id: '2',
    time: '10:30 AM',
    type: 'alert',
    title: 'DDoS Attack Mitigated',
    description: 'Successfully defended against 50K req/s attack',
  },
  {
    id: '3',
    time: '11:15 AM',
    type: 'success',
    title: 'Security Scan Complete',
    description: 'No vulnerabilities detected in latest scan',
  },
  {
    id: '4',
    time: '12:00 PM',
    type: 'error',
    title: 'Authentication Service Issue',
    description: 'OAuth provider timeout detected',
  },
  {
    id: '5',
    time: '01:30 PM',
    type: 'security',
    title: 'SSL Certificate Renewed',
    description: 'Successfully updated SSL certificates',
  },
];

export const SecurityTimeline: React.FC = () => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-cyber-blue text-cyber-blue';
      case 'alert': return 'bg-cyber-orange text-cyber-orange';
      case 'success': return 'bg-cyber-green text-cyber-green';
      case 'error': return 'bg-cyber-red text-cyber-red';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyber-purple" />
          Security Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-border" />
            
            {/* Timeline events */}
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="flex gap-4 relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline dot */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ${getEventColor(event.type)} bg-opacity-20`}>
                    {getEventIcon(event.type)}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 pb-4">
                    <div className="rounded-lg border border-border/50 bg-muted/30 p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};