import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { DrillDownModal, generateDrillDownData } from '@/components/dashboard/DrillDownModal';
import { SkeletonKpiCard, SkeletonChart, SkeletonTable } from '@/components/dashboard/Skeletons';
import { generateRevenueData, generateTransactions } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import type { KpiData } from '@/lib/mock-data';

const revenueKpis: KpiData[] = [
  { title: 'MRR', value: '$48,352', change: 12.5, trend: 'up', icon: 'dollar' },
  { title: 'ARR', value: '$580,000', change: 15.2, trend: 'up', icon: 'dollar' },
  { title: 'ARPU', value: '$38.20', change: 3.7, trend: 'up', icon: 'trending' },
  { title: 'Churn Rate', value: '2.4%', change: -0.5, trend: 'up', icon: 'activity' },
];

const RevenueAnalytics = () => {
  const [revenueData] = useState(generateRevenueData);
  const [transactions] = useState(generateTransactions);
  const [loading, setLoading] = useState(true);
  const [drillDown, setDrillDown] = useState<{ open: boolean; data: ReturnType<typeof generateDrillDownData> | null }>({
    open: false,
    data: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout title="Revenue">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonKpiCard key={i} />)
          : revenueKpis.map((kpi, i) => <KpiCard key={kpi.title} data={kpi} index={i} />)
        }
      </div>
      <div className="mb-6">
        {loading ? (
          <SkeletonChart />
        ) : (
          <RevenueChart
            data={revenueData}
            onBarClick={(month) => setDrillDown({ open: true, data: generateDrillDownData(month) })}
          />
        )}
      </div>
      {loading ? <SkeletonTable /> : <TransactionsTable data={transactions} />}
      <DrillDownModal
        open={drillDown.open}
        onOpenChange={(open) => setDrillDown((d) => ({ ...d, open }))}
        data={drillDown.data}
      />
    </DashboardLayout>
  );
};

export default RevenueAnalytics;
