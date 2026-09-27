import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

function RestaurantMenueList({ itemCards }) {

    const dispatch=useDispatch()
    function handleAddItem(item){
         dispatch(addItem(item))
    }
  return (
    <>
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
                <div className="relative flex justify-center">
                  <img
                    className="h-48 w-52 rounded-2xl object-cover "
                    src={CDN_URL + imageId}
                    alt={name}
                  ></img>
                  <button className=" bg-white absolute bottom-1 w-24 p-1.5 m-2 shadow-lg shadow-neutral-400 rounded-lg text-xl font-bold text-emerald-600 cursor-pointer shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] tracking-tighter"
                  onClick={()=>handleAddItem(item)}>
                    ADD
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RestaurantMenueList;
