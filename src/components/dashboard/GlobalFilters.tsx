import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined };
  category: string;
  status: string;
}

interface GlobalFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function GlobalFilters({ filters, onFiltersChange }: GlobalFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-up" style={{ opacity: 0 }}>
      {/* Date Range Picker */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'h-8 text-xs gap-1.5 border-border/50 bg-secondary/30 hover:bg-secondary/60',
              !filters.dateRange.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {filters.dateRange.from ? (
              filters.dateRange.to ? (
                `${format(filters.dateRange.from, 'MMM d')} – ${format(filters.dateRange.to, 'MMM d')}`
              ) : (
                format(filters.dateRange.from, 'MMM d, yyyy')
              )
            ) : (
              'Date range'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{ from: filters.dateRange.from, to: filters.dateRange.to }}
            onSelect={(range) => {
              updateFilter('dateRange', { from: range?.from, to: range?.to });
            }}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Category Filter */}
      <Select value={filters.category} onValueChange={(v) => updateFilter('category', v)}>
        <SelectTrigger className="h-8 w-[130px] text-xs border-border/50 bg-secondary/30">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="saas">SaaS</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
          <SelectItem value="startup">Startup</SelectItem>
          <SelectItem value="agency">Agency</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
        <SelectTrigger className="h-8 w-[120px] text-xs border-border/50 bg-secondary/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset */}
      {(filters.dateRange.from || filters.category !== 'all' || filters.status !== 'all') && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => onFiltersChange({ dateRange: { from: undefined, to: undefined }, category: 'all', status: 'all' })}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
