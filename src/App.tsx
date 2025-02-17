import { useState, useEffect, useCallback } from "react";
import ArticleCard from "./components/ArticleCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RefreshIcon from "./components/RefreshIcon";
import SkeletonCard from "./components/SkeletonCard";
import usePullToRefresh from "./utils/usePullToRefresh";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger);

interface ArticleData {
  articleUrl: string;
  description: string;
  image: string;
  author: string;
  authorImg: string;
  authorUrl: string;
  title: string;
  institution: string;
  date: string;
}

function App() {
  const [data, setData] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/data`);
      if (res.status === 429) return;
      const newData = await res.json();
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching articles...");
    } finally {
      setLoading(false);
      setNearBottom(false);
    }
  }, []);

  const handleRefresh = async () => {
    if (!loading) {
      setData([]); // Clear existing data
      setLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/data`);
        if (res.status === 429) return;
        const newData = await res.json();
        setData(newData); // Replace old data with fresh data
      } catch (error) {
        console.error("Error fetching articles...");
      } finally {
        setLoading(false);
        setNearBottom(false);
      }
    }
  };

  const THRESHOLD = 60;
  const { ptrRef, pullDistance, refreshing } = usePullToRefresh(
    handleRefresh,
    THRESHOLD
  );

  // Initial fetch
  useEffect(() => {
    fetchArticles();
  }, []);

  // Load more when near bottom
  useEffect(() => {
    if (nearBottom && !loading) {
      setLoading(true);
      fetchArticles();
    }
  }, [nearBottom, loading, fetchArticles]);

  useGSAP(
    () => {
      if (!ptrRef.current) return;

      let timeout: ReturnType<typeof setTimeout>;

      const bounceAnimation = () => {
        const activeEl = document.querySelector(".active");
        if (!activeEl) return;
        const nextEl = activeEl.nextElementSibling;
        if (!nextEl) return;
        nextEl.classList.add("animate-effect");
        setTimeout(() => {
          nextEl.classList.remove("animate-effect");
        }, 4000);
      };

      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(bounceAnimation, 10000); // 10s delay
      };

      // Create the Observer and store its instance
      const observer = Observer.create({
        target: ptrRef.current,
        type: "wheel,touch,pointer",
        onChange: () => resetTimeout(),
        onDown: (self) => {
          const target = self.vars.target;
          if (!(target instanceof HTMLElement)) return;
          const totalHeight = target.scrollHeight;
          const currentScrollDepth = target.scrollTop;
          const distanceFromBottom = Math.floor(
            (totalHeight - currentScrollDepth) / window.innerHeight
          );
          if (distanceFromBottom <= 3) {
            setNearBottom(true);
          }
        },
        tolerance: 5,
      });

      resetTimeout();

      // Cleanup: clear timeout and kill the observer to avoid duplicate listeners
      return () => {
        clearTimeout(timeout);
        observer.kill();
      };
    },
    { dependencies: [] } // Removed 'data' from dependencies to avoid recreating observers
  );

  // Compute rotation angle based on pull distance (scrub effect)
  const rotation = Math.min((pullDistance / THRESHOLD) * 720 + 110, 720);

  return (
    <>
      <a href="https://theconversation.com/au" className="cursor-pointer">
        <img
          src="The_Conversation_icon.png"
          alt=""
          className="fixed top-2 right-3 h-10 z-50"
        />
      </a>
      <svg
        className="h-8 w-8 max-md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.93 511.93">
        <path d="M476.738 280.436a10.623 10.623 0 0 0-15.04 0l-195.2 195.2V10.996c0-5.333-3.84-10.133-9.067-10.88-6.613-.96-12.267 4.16-12.267 10.56v464.96l-195.093-195.2c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 0 0 0 14.827L248.365 508.81a10.623 10.623 0 0 0 15.04 0l213.333-213.333c4.16-4.054 4.16-10.881 0-15.041" />
      </svg>
      {/* Refresh Icon rotates as you pull down */}
      {(pullDistance > 0 || refreshing) && (
        <div
          style={{
            position: "absolute",
            top: Math.min(pullDistance, THRESHOLD) - 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0,
            opacity: pullDistance / THRESHOLD,
          }}>
          <RefreshIcon refreshing={refreshing} rotation={rotation} />
        </div>
      )}
      <div
        ref={ptrRef}
        className="card-container overflow-y-scroll snap-y snap-mandatory h-dvh scroll-smooth relative">
        {data.map((article, index) => (
          <ArticleCard data={article} key={index} />
        ))}
        {!data.length && (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </>
  );
}

export default App;
