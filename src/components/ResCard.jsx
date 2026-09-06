import React from "react";
import { CDN_URL } from "../utils/constants";

 function ResCard({ resList }) {
  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo, sla } =
    resList?.info || {};
  return (
    <div className=" w-[350px] p-5 m-4 ">   
      <img className="w-full rounded-xl mb-3 h-48" alt={name} src={CDN_URL + cloudinaryImageId} />  
      <div className="px-3">
      <h1 className="truncate font-bold text-lg">{name}</h1>
      <h4 className="truncate ">{cuisines.join(",")}</h4>
      <div>{avgRating}</div>
      <div>{costForTwo}</div>
      <div>{sla.deliveryTime} min</div>
      </div>
    </div>
  );
}

export const withDiscount=(ResCardComp)=>{
return (props)=>{
    const { header, subHeader } =
      props?.resList?.info?.aggregatedDiscountInfoV3 || {};
 return(
  <>
  <label className="absolute  bg-black/80 text-white px-2 py-1 rounded-md text-xs font-extrabold z-10 shadow-md uppercase">
          {header} {subHeader}
        </label>
   <ResCard {...props}/>
  </>
 )
}
}

export default ResCard;
