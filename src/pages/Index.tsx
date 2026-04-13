import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { UserChart } from '@/components/dashboard/UserChart';
import { TrafficPieChart } from '@/components/dashboard/TrafficPieChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { GlobalFilters, type FilterState } from '@/components/dashboard/GlobalFilters';
import { DrillDownModal, generateDrillDownData } from '@/components/dashboard/DrillDownModal';
import { SkeletonKpiCard, SkeletonChart, SkeletonTable, SkeletonActivityFeed } from '@/components/dashboard/Skeletons';
import { useEventNotifications } from '@/hooks/use-event-notifications';
import {
  generateKpis,
  generateRevenueData,
  generateUserMetrics,
  generatePieData,
  generateInitialActivity,
  generateActivityEvent,
  generateTransactions,
} from '@/lib/mock-data';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [kpis] = useState(generateKpis);
  const [revenueData] = useState(generateRevenueData);
  const [userMetrics] = useState(generateUserMetrics);
  const [pieData] = useState(generatePieData);
  const [transactions] = useState(generateTransactions);
  const [activity, setActivity] = useState(() => generateInitialActivity(8));
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: undefined, to: undefined },
    category: 'all',
    status: 'all',
  });
  const [drillDown, setDrillDown] = useState<{ open: boolean; data: ReturnType<typeof generateDrillDownData> | null }>({
    open: false,
    data: null,
  });

  // Toast notifications for new events
  useEventNotifications(activity);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time activity events
  useEffect(() => {
    const interval = setInterval(() => {
      setActivity((prev) => {
        const newEvent = generateActivityEvent();
        return [newEvent, ...prev].slice(0, 20);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter transactions by status
  const filteredTransactions = filters.status === 'all'
    ? transactions
    : transactions.filter((t) => t.status === filters.status);

  const handleChartDrillDown = (monthName: string) => {
    setDrillDown({ open: true, data: generateDrillDownData(monthName) });
  };

  return (
    <DashboardLayout title="Overview">
      {/* Global Filters */}
      <GlobalFilters filters={filters} onFiltersChange={setFilters} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonKpiCard key={i} />)
          : kpis.map((kpi, i) => <KpiCard key={kpi.title} data={kpi} index={i} />)
        }
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          {loading ? <SkeletonChart /> : <RevenueChart data={revenueData} onBarClick={handleChartDrillDown} />}
        </div>
        {loading ? <SkeletonChart /> : <TrafficPieChart data={pieData} />}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          {loading ? <SkeletonChart /> : <UserChart data={userMetrics} />}
        </div>
        {loading ? <SkeletonActivityFeed /> : <ActivityFeed events={activity} />}
      </div>

      {/* Transactions */}
      {loading ? <SkeletonTable /> : <TransactionsTable data={filteredTransactions} />}

      {/* Drill-Down Modal */}
      <DrillDownModal
        open={drillDown.open}
        onOpenChange={(open) => setDrillDown((d) => ({ ...d, open }))}
        data={drillDown.data}
      />
    </DashboardLayout>
  );
};

export default Index;
