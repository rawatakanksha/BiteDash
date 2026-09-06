import React from "react";
import { CDN_URL } from "../utils/constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function RestaurantMenueCard({ cards }) {
  const title = cards?.card?.card?.title;
  const itemCards = cards?.card?.card?.itemCards || [];

  return (
   
    <div className="mb-6">
    
   { (title)?
  ( <div className="flex justify-between">
    <h2 className="text-2xl font-bold  p-4 text-gray-800">{title}</h2>
    <div  className="text-gray-600 content-center">
        <KeyboardArrowUpIcon  fontSize="large">keyboard_arrow_up</KeyboardArrowUpIcon>
    </div>
    </div>):(<div></div>)
}
      <div className="space-y-4">
        {itemCards.map((item) => {
          const { id, name, imageId, price, defaultPrice, description } =
            item?.card?.info || {};
          return (
            <div
              key={id}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              <div className="flex-1 pr-4">
                <div className="font-bold text-lg text-gray-800">{name}</div>
                <div className="font-semibold text-gray-700">
                  ₹{(price || defaultPrice) / 100}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {description}
                </p>
              </div>

              {imageId && (
                <div>
                  <img
                    className="h-48 w-52 rounded-2xl object-cover"
                    src={CDN_URL + imageId}
                    alt={name}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantMenueCard;
