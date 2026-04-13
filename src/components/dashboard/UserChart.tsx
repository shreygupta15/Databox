import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { UserMetric } from '@/lib/mock-data';
import { useTheme } from '@/hooks/use-theme';

interface UserChartProps {
  data: UserMetric[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm !bg-card/90">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function UserChart({ data }: UserChartProps) {
  const { theme } = useTheme();
  const gridColor = theme === 'dark' ? 'hsl(224, 14%, 16%)' : 'hsl(220, 14%, 92%)';
  const tickColor = theme === 'dark' ? 'hsl(215, 14%, 50%)' : 'hsl(215, 14%, 45%)';

  return (
    <div className="chart-container animate-fade-up stagger-3" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium">User Activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Weekly breakdown by user type</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="active" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="new" fill="hsl(172, 66%, 50%)" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="returning" fill="hsl(280, 65%, 60%)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
