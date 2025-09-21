import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search logs, events, IP addresses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:border-cyber-cyan"
        />
      </div>
      
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[150px] bg-background/50">
          <SelectValue placeholder="Log Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
          <SelectItem value="error">Error</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="info">Info</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="24h">
        <SelectTrigger className="w-full sm:w-[150px] bg-background/50">
          <Calendar className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1h">Last Hour</SelectItem>
          <SelectItem value="24h">Last 24 Hours</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="cyber" className="w-full sm:w-auto">
        <Filter className="w-4 h-4 mr-2" />
        Apply Filters
      </Button>
    </div>
  );
};