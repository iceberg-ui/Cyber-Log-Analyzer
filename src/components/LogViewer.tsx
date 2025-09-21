import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  source: string;
  message: string;
}

const generateMockLogs = (): LogEntry[] => {
  const levels: ('INFO' | 'WARNING' | 'ERROR' | 'CRITICAL')[] = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];
  const sources = ['auth-service', 'api-gateway', 'firewall', 'database', 'web-server'];
  const messages = [
    'User authentication successful',
    'Failed login attempt detected',
    'SQL injection attempt blocked',
    'Unusual traffic pattern detected',
    'Connection timeout to service',
    'Rate limit exceeded',
    'Certificate validation failed',
    'Suspicious file upload blocked',
    'Session hijacking attempt prevented',
    'Port scan detected from IP',
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
  }));
};

export const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(generateMockLogs());
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll) {
        setLogs(prev => {
          const newLog: LogEntry = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            level: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'][Math.floor(Math.random() * 4)] as LogEntry['level'],
            source: ['auth-service', 'api-gateway', 'firewall', 'database', 'web-server'][Math.floor(Math.random() * 5)],
            message: [
              'User authentication successful',
              'Failed login attempt detected',
              'SQL injection attempt blocked',
              'Unusual traffic pattern detected',
            ][Math.floor(Math.random() * 4)],
          };
          return [newLog, ...prev.slice(0, 49)];
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-cyber-blue';
      case 'WARNING': return 'text-cyber-orange';
      case 'ERROR': return 'text-cyber-red';
      case 'CRITICAL': return 'text-cyber-red font-bold animate-pulse-glow';
      default: return 'text-muted-foreground';
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'INFO': return 'secondary';
      case 'WARNING': return 'outline';
      case 'ERROR': return 'destructive';
      case 'CRITICAL': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-[500px] border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyber-green/5 pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyber-green" />
          Live Log Stream
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Auto-scroll</span>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`w-10 h-5 rounded-full transition-colors ${
              autoScroll ? 'bg-cyber-green' : 'bg-muted'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-background transition-transform ${
              autoScroll ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[420px] px-6 pb-6">
          <div className="font-mono text-xs space-y-1">
            {logs.map((log, index) => (
              <div
                key={log.id}
                className={`p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in ${
                  index === 0 ? 'border-l-2 border-cyber-cyan' : ''
                }`}
              >
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <Badge variant={getLevelBadgeVariant(log.level)} className="text-xs">
                    {log.level}
                  </Badge>
                  <span className="text-cyber-purple">[{log.source}]</span>
                  <span className={getLevelColor(log.level)}>{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};