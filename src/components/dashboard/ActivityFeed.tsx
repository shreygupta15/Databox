import { UserPlus, ShoppingCart, ArrowUpCircle, AlertTriangle, Award } from 'lucide-react';
import type { ActivityEvent } from '@/lib/mock-data';

const typeConfig: Record<ActivityEvent['type'], { icon: React.ElementType; color: string }> = {
  signup: { icon: UserPlus, color: 'text-primary' },
  purchase: { icon: ShoppingCart, color: 'text-success' },
  upgrade: { icon: ArrowUpCircle, color: 'text-accent' },
  alert: { icon: AlertTriangle, color: 'text-warning' },
  milestone: { icon: Award, color: 'text-primary' },
};

interface ActivityFeedProps {
  events: ActivityEvent[];
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="chart-container animate-fade-up stagger-4" style={{ opacity: 0 }}>
      <div className="mb-4">
        <h3 className="text-sm font-medium">Activity Feed</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Real-time events</p>
      </div>
      <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
        {events.map((event, i) => {
          const config = typeConfig[event.type];
          const Icon = config.icon;
          return (
            <div
              key={event.id}
              className={`flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors ${i === 0 ? 'animate-slide-in' : ''}`}
            >
              <div className={`p-1.5 rounded-md bg-secondary/80 ${config.color} shrink-0 mt-0.5`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug truncate">{event.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{timeAgo(event.timestamp)}</span>
                  {event.amount && (
                    <span className="text-xs font-medium text-success">${event.amount}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
