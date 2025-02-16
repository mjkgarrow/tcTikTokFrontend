import { useState, useEffect, useRef, useCallback } from "react";
import ArticleCard from "./components/ArticleCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger);

function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    if (nearBottom && !loading) {
      setLoading(true);
      fetchArticles();
      setNearBottom(false);
    }
  }, [nearBottom, loading]);

  useGSAP(
    () => {
      if (!scrollRef.current) return;

      Observer.create({
        target: scrollRef.current,
        type: "wheel,touch,pointer",

        onDown: (self) => {
          const target = self.vars.target;

          if (!(target instanceof HTMLElement)) return;

          // Total wrapper height and current scroll from top
          let totalHeight = target.scrollHeight;
          let currentScrollDepth = target.scrollTop;

          // Calculate how far the user is from the bottom
          let distanceFromBottom = Math.floor(
            (totalHeight - currentScrollDepth) / window.innerHeight
          );

          // Trigger refresh if within 3 slides of the last slide
          if (distanceFromBottom <= 3) {
            setNearBottom(true);
          }
        },
        tolerance: 5,
      });
    },
    { dependencies: [data] }
  );

  return (
    <>
      <a href="https://theconversation.com/au" className="cursor-pointer">
        <img
          src="The_Conversation_icon.png"
          alt=""
          className="fixed top-2 right-3 h-10 z-50 "
        />
      </a>
      <svg
        className="h-8 w-8 max-md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.93 511.93">
        <path d="M476.738 280.436a10.623 10.623 0 0 0-15.04 0l-195.2 195.2V10.996c0-5.333-3.84-10.133-9.067-10.88-6.613-.96-12.267 4.16-12.267 10.56v464.96l-195.093-195.2c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 0 0 0 14.827L248.365 508.81a10.623 10.623 0 0 0 15.04 0l213.333-213.333c4.16-4.054 4.16-10.881 0-15.041" />
      </svg>
      <div
        ref={scrollRef}
        className="card-container overflow-y-scroll snap-y snap-mandatory h-dvh scroll-smooth relative">
        {data.map((article, index) => (
          <ArticleCard data={article} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
