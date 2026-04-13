import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '@/lib/mock-data';
import { useTheme } from '@/hooks/use-theme';

interface RevenueChartProps {
  data: ChartDataPoint[];
  onBarClick?: (monthName: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm !bg-card/90">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
          {entry.name}: {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
        </p>
      ))}
      <p className="text-[10px] text-muted-foreground/60 mt-2">Click for weekly breakdown</p>
    </div>
  );
};

export function RevenueChart({ data, onBarClick }: RevenueChartProps) {
  const { theme } = useTheme();
  const gridColor = theme === 'dark' ? 'hsl(224, 14%, 16%)' : 'hsl(220, 14%, 92%)';
  const tickColor = theme === 'dark' ? 'hsl(215, 14%, 50%)' : 'hsl(215, 14%, 45%)';

  return (
    <div className="chart-container animate-fade-up stagger-2" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue & user growth</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            onClick={(e) => {
              if (e?.activeLabel && onBarClick) onBarClick(e.activeLabel);
            }}
            style={{ cursor: onBarClick ? 'pointer' : 'default' }}
          >
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(172, 66%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(172, 66%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(217, 91%, 60%)" fill="url(#revGrad)" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: 'hsl(217, 91%, 60%)' }} />
            <Area type="monotone" dataKey="users" stroke="hsl(172, 66%, 50%)" fill="url(#userGrad)" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: 'hsl(172, 66%, 50%)' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
