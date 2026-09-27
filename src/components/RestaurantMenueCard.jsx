import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RestaurantMenueList from "./RestaurantMenueList";

function RestaurantMenueCard({ cards, showItem,setShowIndex }) {
  const title = cards?.card?.card?.title;
  const categories = cards?.card?.card?.categories;
  // const itemList= categories.map((item)=>item.itemCards)
  const itemCards =
    cards?.card?.card?.itemCards || categories?.flatMap((cat) => cat?.itemCards) ||[];
   function handleClick(){
     setShowIndex();
    }

  return (
    <div className="mb-6">
      {title ? (
      
        <div className="flex justify-between" onClick={handleClick}>
          <h2 className="text-2xl font-bold  p-4 text-gray-800">{title}({itemCards.length})</h2>
          <div className="text-gray-600 content-center">
             { showItem?(
            <KeyboardArrowUpIcon fontSize="large">
              keyboard_arrow_up
            </KeyboardArrowUpIcon>
              ):(<KeyboardArrowDownIcon fontSize="large">
              keyboard_arrow_down
            </KeyboardArrowDownIcon>)}
          </div>
        </div>
      ) : (
        <div></div>
      )}
     {showItem &&<RestaurantMenueList itemCards={itemCards}/>}
    </div>
  );
}

export default RestaurantMenueCard;
