import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

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
import { SortableWidget } from '@/components/dashboard/SortableWidget';
import { AIAssistant } from '@/components/dashboard/AIAssistant';
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

const defaultLayout = [
  { id: 'revenue', type: 'revenue', size: 'col-span-1 lg:col-span-2' },
  { id: 'traffic', type: 'traffic', size: 'col-span-1' },
  { id: 'users', type: 'users', size: 'col-span-1 lg:col-span-2' },
  { id: 'activity', type: 'activity', size: 'col-span-1' }
];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [kpis] = useState(generateKpis);
  const [revenueData] = useState(generateRevenueData);
  const [userMetrics] = useState(generateUserMetrics);
  const [pieData] = useState(generatePieData);
  const [transactions] = useState(generateTransactions);
  const [activity, setActivity] = useState(() => generateInitialActivity(8));
  
  // Drag and Drop Layout State
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem('dashboard-layout');
    return saved ? JSON.parse(saved) : defaultLayout;
  });

  const [drillDown, setDrillDown] = useState<{ open: boolean; data: ReturnType<typeof generateDrillDownData> | null }>({
    open: false,
    data: null,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // URL-based Filters State mapping
  const filters: FilterState = {
    category: searchParams.get('category') || 'all',
    status: searchParams.get('status') || 'all',
    dateRange: {
      from: searchParams.get('from') ? new Date(searchParams.get('from')!) : undefined,
      to: searchParams.get('to') ? new Date(searchParams.get('to')!) : undefined,
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.status !== 'all') params.set('status', newFilters.status);
    if (newFilters.dateRange.from) params.set('from', newFilters.dateRange.from.toISOString());
    if (newFilters.dateRange.to) params.set('to', newFilters.dateRange.to.toISOString());
    setSearchParams(params);
  };

  useEventNotifications(activity);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity((prev) => {
        const newEvent = generateActivityEvent();
        return [newEvent, ...prev].slice(0, 20);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLayout((items: typeof defaultLayout) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newLayout = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
        return newLayout;
      });
    }
  };

  const filteredTransactions = filters.status === 'all'
    ? transactions
    : transactions.filter((t) => t.status === filters.status);

  const renderWidget = (item: typeof defaultLayout[0]) => {
    switch (item.type) {
      case 'revenue':
        return loading ? <SkeletonChart /> : <RevenueChart data={revenueData} onBarClick={(month) => setDrillDown({ open: true, data: generateDrillDownData(month) })} />;
      case 'traffic':
        return loading ? <SkeletonChart /> : <TrafficPieChart data={pieData} />;
      case 'users':
        return loading ? <SkeletonChart /> : <UserChart data={userMetrics} />;
      case 'activity':
        return loading ? <SkeletonActivityFeed /> : <ActivityFeed events={activity} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Overview">
      <GlobalFilters filters={filters} onFiltersChange={handleFiltersChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonKpiCard key={i} />)
          : kpis.map((kpi, i) => <KpiCard key={kpi.title} data={kpi} index={i} />)
        }
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={layout.map(item => item.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {layout.map((item) => (
              <SortableWidget key={item.id} id={item.id} className={item.size}>
                {renderWidget(item)}
              </SortableWidget>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-8">
        {loading ? <SkeletonTable /> : <TransactionsTable data={filteredTransactions} />}
      </div>

      <AIAssistant />

      <DrillDownModal
        open={drillDown.open}
        onOpenChange={(open) => setDrillDown((d) => ({ ...d, open }))}
        data={drillDown.data}
      />
    </DashboardLayout>
  );
};

export default Index;
