export default function SkeletonCard() {
  return (
    <div className="snap-start h-dvh md:p-14 place-content-center skeleton-card">
      <div className="relative mx-auto bg-gray-300 animate-pulse h-auto max-h-full w-auto max-w-full overflow-hidden grid grid-cols-1 grid-rows-1 max-md:h-full max-md:w-full md:aspect-[3/4] xl:aspect-[4/3] md:rounded-lg md:shadow-2xl">
        <div className="col-start-1 row-start-1 p-4 pb-7 z-10 h-full flex flex-col justify-end">
          <div className="relative">
            {/* Author Info Placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-10 aspect-square bg-gray-400 rounded-full"></div>
              <div>
                <div className="w-24 h-4 bg-gray-400 rounded"></div>
                <div className="w-16 h-3 bg-gray-400 rounded mt-1"></div>
              </div>
            </div>
            <div className="absolute -top-4 left-12 w-12 h-3 bg-gray-400 rounded"></div>
          </div>

          {/* Title Placeholder */}
          <div className="mt-4 w-3/4 h-5 bg-gray-400 rounded"></div>

          {/* Description Placeholder */}
          <div className="mt-2 space-y-2">
            <div className="w-full h-3 bg-gray-400 rounded"></div>
            <div className="w-full h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
