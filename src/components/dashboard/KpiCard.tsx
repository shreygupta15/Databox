import { TrendingUp, TrendingDown, DollarSign, Users, Activity, BarChart3 } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import type { KpiData } from '@/lib/mock-data';

const iconMap: Record<string, React.ElementType> = {
  dollar: DollarSign,
  users: Users,
  trending: BarChart3,
  activity: Activity,
};

function parseValue(value: string): { prefix: string; number: number; suffix: string; decimals: number } {
  const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: '', decimals: 0 };
  const numStr = match[2].replace(/,/g, '');
  const decimalParts = numStr.split('.');
  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals: decimalParts.length > 1 ? decimalParts[1].length : 0,
  };
}

interface KpiCardProps {
  data: KpiData;
  index: number;
  loading?: boolean;
}

export function KpiCard({ data, index, loading }: KpiCardProps) {
  const Icon = iconMap[data.icon] || Activity;
  const isPositive = data.trend === 'up';
  const parsed = parseValue(data.value);
  const animated = useAnimatedCounter({
    end: parsed.number,
    prefix: parsed.prefix,
    suffix: parsed.suffix,
    decimals: parsed.decimals,
    duration: 1000 + index * 200,
  });

  if (loading) {
    return (
      <div className="kpi-card">
        <div className="flex items-start justify-between mb-4">
          <div className="h-10 w-10 skeleton-pulse rounded-lg" />
          <div className="h-6 w-16 skeleton-pulse rounded-full" />
        </div>
        <div className="h-4 w-24 skeleton-pulse mb-2" />
        <div className="h-7 w-32 skeleton-pulse" />
      </div>
    );
  }

  return (
    <div className={`kpi-card animate-fade-up stagger-${index + 1}`} style={{ opacity: 0 }}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(data.change)}%
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{data.title}</p>
      <p className="text-2xl font-semibold tracking-tight animate-count-up">{animated}</p>
    </div>
  );
}
