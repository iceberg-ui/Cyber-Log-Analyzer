import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface ThreatLevel {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  description: string;
}

export const ThreatIndicator: React.FC = () => {
  const currentThreat: ThreatLevel = {
    level: 'MEDIUM',
    score: 65,
    description: 'Elevated activity detected in authentication services',
  };

  const getThreatColor = () => {
    switch (currentThreat.level) {
      case 'LOW': return 'text-cyber-green';
      case 'MEDIUM': return 'text-cyber-orange';
      case 'HIGH': return 'text-cyber-red';
      case 'CRITICAL': return 'text-cyber-red animate-pulse';
      default: return 'text-muted-foreground';
    }
  };

  const getThreatIcon = () => {
    switch (currentThreat.level) {
      case 'LOW': return <ShieldCheck className="w-8 h-8" />;
      case 'MEDIUM': return <Shield className="w-8 h-8" />;
      case 'HIGH': return <ShieldAlert className="w-8 h-8" />;
      case 'CRITICAL': return <AlertCircle className="w-8 h-8 animate-pulse" />;
      default: return <Shield className="w-8 h-8" />;
    }
  };

  const getProgressColor = () => {
    if (currentThreat.score < 30) return 'bg-cyber-green';
    if (currentThreat.score < 60) return 'bg-cyber-orange';
    return 'bg-cyber-red';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Threat Level</span>
          <span className={`text-2xl font-bold ${getThreatColor()}`}>
            {currentThreat.level}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className={`p-6 rounded-full bg-muted/50 ${getThreatColor()}`}>
            {getThreatIcon()}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk Score</span>
            <span className="font-bold">{currentThreat.score}/100</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${currentThreat.score}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {currentThreat.description}
        </p>
      </CardContent>
    </Card>
  );
};