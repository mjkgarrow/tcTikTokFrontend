// usePullToRefresh.ts
import { useEffect, useRef, useState } from "react";

type OnRefresh = () => Promise<any>;

export interface PullToRefreshResult {
  // Updated to allow null since useRef can initially be null.
  ptrRef: React.RefObject<HTMLDivElement | null>;
  pullDistance: number;
  refreshing: boolean;
}

const usePullToRefresh = (
  onRefresh: OnRefresh,
  threshold: number = 60
): PullToRefreshResult => {
  const ptrRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const ptr = ptrRef.current;
    if (!ptr) return;

    const MAX = 128;
    const k = 0.4;
    const appr = (x: number) => MAX * (1 - Math.exp((-k * x) / MAX));

    const handleTouchStart = (e: TouchEvent) => {
      if (ptr.scrollTop === 0 && !refreshing) {
        startYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (ptr.scrollTop === 0 && !refreshing) {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startYRef.current;
        if (diff > 0) {
          e.preventDefault();
          const transformedDistance = appr(diff);
          setPullDistance(transformedDistance);
          ptr.style.transform = `translateY(${transformedDistance}px)`;
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance >= threshold && !refreshing) {
        setRefreshing(true);
        onRefresh().finally(() => {
          ptr.style.transition = "transform 0.3s ease";
          ptr.style.transform = "translateY(0px)";
          setPullDistance(0);
          setRefreshing(false);
          setTimeout(() => {
            ptr.style.transition = "";
          }, 300);
        });
      } else {
        ptr.style.transition = "transform 0.3s ease";
        ptr.style.transform = "translateY(0px)";
        setPullDistance(0);
        setTimeout(() => {
          ptr.style.transition = "";
        }, 300);
      }
    };

    ptr.addEventListener("touchstart", handleTouchStart, { passive: true });
    ptr.addEventListener("touchmove", handleTouchMove, { passive: false });
    ptr.addEventListener("touchend", handleTouchEnd);

    return () => {
      ptr.removeEventListener("touchstart", handleTouchStart);
      ptr.removeEventListener("touchmove", handleTouchMove);
      ptr.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh, pullDistance, refreshing, threshold]);

  return { ptrRef, pullDistance, refreshing };
};

export default usePullToRefresh;
