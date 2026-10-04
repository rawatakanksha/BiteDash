import React from "react";

function Shimmer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Top Banner / Search Header Skeleton */}
      <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-3xl border border-orange-100 shadow-2xs">
        <div className="h-7 w-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 w-96 max-w-full bg-gray-200 rounded-md mb-6"></div>

        {/* Search & Filter Controls Skeleton */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-12 w-72 sm:w-96 bg-gray-200 rounded-2xl"></div>
          <div className="h-12 w-28 bg-gray-200 rounded-2xl"></div>
          <div className="h-12 w-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-12 w-36 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Category Pills Skeleton */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-8">
        {Array(8)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-2xl border border-gray-200/60"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
            </div>
          ))}
      </div>

      {/* Restaurant Grid Skeleton (Matching ResCard.jsx layout) */}
      <div className="flex flex-wrap items-stretch justify-center -mx-2">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[280px] lg:w-[290px] m-3 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs flex flex-col justify-between h-[360px]"
            >
              {/* Image Skeleton */}
              <div className="w-full h-44 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
              </div>

              {/* Card Body Skeleton */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                  {/* Cuisines */}
                  <div className="h-3.5 bg-gray-200 rounded-md w-1/2"></div>
                </div>

                {/* Footer Info Pills Skeleton */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-4">
                  <div className="h-5 w-12 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shimmer;