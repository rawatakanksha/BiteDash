import React from "react";
import { CDN_URL } from "../utils/constants";

function ResCard({ resList }) {
  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo, sla, aggregatedDiscountInfoV3 } =
    resList?.info || {};

  const discountHeader = aggregatedDiscountInfoV3?.header;
  const discountSubHeader = aggregatedDiscountInfoV3?.subHeader;

  return (
    <div className="w-[300px] sm:w-[280px] lg:w-[284px] m-3 bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col justify-between h-[360px]">
      {/* Image Container with Discount Badge */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          alt={name || "Restaurant"}
          src={
            cloudinaryImageId
              ? CDN_URL + cloudinaryImageId
              : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80";
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {(discountHeader || discountSubHeader) && (
          <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1.5">
            <span className="text-white font-extrabold text-sm tracking-wide drop-shadow-md truncate">
              {discountHeader} {discountSubHeader}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-orange-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-500 truncate mt-1 font-medium">
            {Array.isArray(cuisines) ? cuisines.join(", ") : "Multi-cuisine"}
          </p>
        </div>

        {/* Info Pills Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700 mt-2">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-white font-bold text-xs ${
            avgRating >= 4 ? "bg-emerald-600" : avgRating >= 3.5 ? "bg-amber-500" : "bg-orange-500"
          }`}>
            <span>★</span>
            <span>{avgRating || "4.0"}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <svg className="w-3.5 h-3.5 text-orange-500 fill-current" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>{sla?.deliveryTime || sla?.slaString || "25-30"} mins</span>
          </div>
          <div className="text-gray-500 font-medium">
            {costForTwo || "₹300 for two"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResCard;
