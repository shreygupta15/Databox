import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import type { ActivityEvent } from '@/lib/mock-data';
import { UserPlus, ShoppingCart, ArrowUpCircle, AlertTriangle, Award } from 'lucide-react';

const typeLabels: Record<ActivityEvent['type'], { label: string; icon: string }> = {
  signup: { label: '🎉 New Signup', icon: '🎉' },
  purchase: { label: '💰 Purchase', icon: '💰' },
  upgrade: { label: '⬆️ Upgrade', icon: '⬆️' },
  alert: { label: '⚠️ Alert', icon: '⚠️' },
  milestone: { label: '🏆 Milestone', icon: '🏆' },
};

export function useEventNotifications(events: ActivityEvent[]) {
  const prevCountRef = useRef(events.length);

  useEffect(() => {
    if (events.length > prevCountRef.current) {
      const newEvent = events[0];
      if (newEvent) {
        const config = typeLabels[newEvent.type];
        toast(config.label, {
          description: newEvent.message,
          duration: 3000,
        });
      }
    }
    prevCountRef.current = events.length;
  }, [events.length]);
}
