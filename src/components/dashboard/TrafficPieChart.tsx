import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TrafficPieChartProps {
  data: { name: string; value: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm !bg-card/90">
      <p className="font-medium">{payload[0].name}: {payload[0].value}%</p>
    </div>
  );
};

export function TrafficPieChart({ data }: TrafficPieChartProps) {
  return (
    <div className="chart-container animate-fade-up stagger-4" style={{ opacity: 0 }}>
      <div className="mb-6">
        <h3 className="text-sm font-medium">Traffic Sources</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Distribution by channel</p>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" strokeWidth={0}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
            <span>{item.name}</span>
            <span className="ml-auto font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
