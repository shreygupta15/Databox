import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { generateInitialActivity, generateActivityEvent } from '@/lib/mock-data';

const ActivityPage = () => {
  const [activity, setActivity] = useState(() => generateInitialActivity(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity((prev) => [generateActivityEvent(), ...prev].slice(0, 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title="Activity">
      <div className="max-w-2xl">
        <ActivityFeed events={activity} />
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;
