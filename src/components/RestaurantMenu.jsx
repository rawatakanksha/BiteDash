import Shimmer from "./ShimmerUI";
import { NavLink } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import RestaurantMenueCard from "./RestaurantMenueCard";
import { MENUE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";

function RestaurantMenue() {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex,setShowIndex]=useState(1)

  if (resInfo === null) return <Shimmer />;
  const {
    name,
    city,
    cloudinaryImageId,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    id,
  } = resInfo?.data?.cards[2]?.card?.card?.info;
  
   const groupedCardObject = resInfo?.data?.cards?.find(
    (c) => c?.groupedCard
  );
 const cards =
    groupedCardObject?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  return (
    <>
      {console.log(resInfo.data,"resssinfo")}
      {console.log(cards)}
      <div className="pt-5 pl-96 pr-96">
        <div className="p-3 text-gray-500 text-xs font-semibold">
          <NavLink  to="/"><span className="hover:text-black">Home</span></NavLink> / {city} /<span className="text-black"> {name}</span>
        </div>
        <div className="text-3xl font-bold p-3">{name}</div>
        <div className="w-full p-3 flex h-96 overflow-hidden">
          <img
            className="w-full rounded-3xl h-full object-cover object-center block"
            alt={name}
            src={CDN_URL + cloudinaryImageId}
          />
        </div>
        <div className="font-bold p-1">
          <span>{avgRating}</span>
          <span> ({totalRatingsString})</span>
          <span> {costForTwoMessage}</span>
        </div>
        <div className="text-amber-600 font-bold">{cuisines.join(",")}</div>

        <div>
          {cards.map((cards,idx) => {
            return <RestaurantMenueCard showItem={idx===showIndex} setShowIndex={()=>setShowIndex(idx===showIndex?null:idx)} key={cards?.card?.card?.title || idx} cards={cards} />;
          })}
        </div>
      </div>
    </>
  );
}

export default RestaurantMenue;
