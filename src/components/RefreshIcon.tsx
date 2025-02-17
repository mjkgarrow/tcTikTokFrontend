// RefreshIcon.tsx
import React from "react";

interface RefreshIconProps {
  refreshing: boolean;
  rotation: number;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({ refreshing, rotation }) => {
  const style = refreshing
    ? { animation: "spin 1s linear infinite" }
    : { transform: `rotate(${rotation}deg)` };

  return (
    <svg
      className="w-8 h-8 fill-[#d8372c]"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 489.645 489.645"
      xmlSpace="preserve">
      <path d="M460.656 132.911c-58.7-122.1-212.2-166.5-331.8-104.1-9.4 5.2-13.5 16.6-8.3 27 5.2 9.4 16.6 13.5 27 8.3 99.9-52 227.4-14.9 276.7 86.3 65.4 134.3-19 236.7-87.4 274.6-93.1 51.7-211.2 17.4-267.6-70.7l69.3 14.5c10.4 2.1 21.8-4.2 23.9-15.6 2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25 16.6-23.9 22.9l15.6 123.8c1 10.4 9.4 17.7 19.8 17.7 12.8 0 20.8-12.5 19.8-23.9l-6-50.5c57.4 70.8 170.3 131.2 307.4 68.2 58.1-30 191.5-147.7 103.9-329.6" />
    </svg>
  );
};

export default RefreshIcon;
