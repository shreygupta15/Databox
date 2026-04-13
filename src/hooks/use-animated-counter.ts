import { useEffect, useRef, useState } from 'react';

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function useAnimatedCounter({ end, duration = 1200, prefix = '', suffix = '', decimals = 0 }: UseAnimatedCounterOptions) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const frameRef = useRef<number>();

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      if (decimals > 0) {
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.floor(current).toLocaleString()}${suffix}`);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, prefix, suffix, decimals]);

  return display;
}
