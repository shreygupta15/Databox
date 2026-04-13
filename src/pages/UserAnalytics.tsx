import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserChart } from '@/components/dashboard/UserChart';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { SkeletonKpiCard, SkeletonChart } from '@/components/dashboard/Skeletons';
import { generateUserMetrics } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import type { KpiData } from '@/lib/mock-data';

const userKpis: KpiData[] = [
  { title: 'Total Users', value: '12,847', change: 8.2, trend: 'up', icon: 'users' },
  { title: 'Active Today', value: '2,103', change: 5.1, trend: 'up', icon: 'activity' },
  { title: 'Retention Rate', value: '68.4%', change: 2.3, trend: 'up', icon: 'trending' },
  { title: 'Avg. Session', value: '4.53', change: -1.8, trend: 'down', icon: 'activity' },
];

const UserAnalytics = () => {
  const [userMetrics] = useState(generateUserMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout title="User Analytics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonKpiCard key={i} />)
          : userKpis.map((kpi, i) => <KpiCard key={kpi.title} data={kpi} index={i} />)
        }
      </div>
      {loading ? <SkeletonChart /> : <UserChart data={userMetrics} />}
    </DashboardLayout>
  );
};

export default UserAnalytics;
