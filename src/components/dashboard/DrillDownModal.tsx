import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DrillDownData {
  title: string;
  data: { name: string; value: number }[];
}

interface DrillDownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DrillDownData | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm !bg-card/90">
      <p className="font-medium mb-1">{label}</p>
      <p className="text-muted-foreground">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

export function DrillDownModal({ open, onOpenChange, data }: DrillDownModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold">{data.title}</DialogTitle>
        </DialogHeader>
        <div className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--chart-tick))', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(var(--chart-tick))', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper to generate drill-down data for a month
export function generateDrillDownData(monthName: string): DrillDownData {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  return {
    title: `${monthName} — Weekly Revenue Breakdown`,
    data: weeks.map((name) => ({
      name,
      value: 5000 + Math.floor(Math.random() * 15000),
    })),
  };
}
