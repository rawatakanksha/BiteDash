import React, { useEffect, useState } from "react";
import ResCard,{withDiscount} from "./ResCard";
import Shimmer from "./ShimmerUI";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
  const ResWithDiscount=withDiscount(ResCard) 

function Body() {
  const [listRes, setListRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [nextOffSet, setNextOffSet] = useState("");
  const [widgetOffset, setWidgetOffset] = useState({});
  const [isFetchingMore, setFetchingMore] = useState(false);
  const onlineStatus=useOnlineStatus();

  const filteredlist = () => {
    const filterRes = listRes.filter((res) => {
      return res.info.avgRating > 4;
    });
    console.log(filterRes);
    setSearchList(filterRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "/api/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
    );

    const json = await data.json();
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    const offset = json?.data?.pageOffset?.nextOffset || json?.data?.nextOffset;
    const wOffset =
      json?.data?.pageOffset?.widgetOffset || json?.data?.widgetOffset || {};
    setNextOffSet(offset);
    setWidgetOffset(wOffset);

    if (restaurants) {
      setListRes(restaurants);
      setSearchList(restaurants);
    }
  };

  const fetchMoreRes = async () => {
    if (!nextOffSet || isFetchingMore) return;

    setFetchingMore(true);

    try {
      const response = await fetch(
        `/api/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING&nextOffset=${encodeURIComponent(nextOffSet)}`,
      );

      if (!response.ok) return;

      const json = await response.json();

      const newRes =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

         

      const newOffset =
        json?.data?.pageOffset?.nextOffset || json?.data?.nextOffset;

      if (newOffset) {
        setNextOffSet(newOffset);
      }

      if (newRes && newRes.length > 0) {
        // Filter out duplicate restaurant IDs
        setListRes((prev) => [...prev, ...newRes]);
        setSearchList((prev) => [...prev, ...newRes]);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        fetchMoreRes();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextOffSet, isFetchingMore]);

  const handleSearch = () => {
    const filterData = listRes.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log(searchText);
    console.log(filterData);
    setSearchList(filterData);
    console.log("after", searchText);
  };

  if(onlineStatus===false) return(
      <h1>Lookes like you are offline, please connct to internet </h1>
    )
  
  return listRes.length === 0 ? (
    <Shimmer />
  ) : (
   <div className="px-40">
      <div>
        <input
          className="border border-amber-500 p-1 m-2 shadow-lg shadow-neutral-400 rounded-lg"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="border border-amber-500 shadow-lg hover:bg-amber-300 shadow-neutral-400 p-1 m-2 rounded-lg cursor-pointer"
          onClick={handleSearch}
        >
          search
        </button>

        <button
          className="border shadow-lg border-amber-500 hover:bg-amber-300 shadow-neutral-400  p-1 m-2 rounded-lg cursor-pointer"
          onClick={filteredlist}
        >
          Top Rated
        </button>
      </div>
      <div className="flex flex-wrap pt-5">
        {searchList.map((res, idx) => {
          return <NavLink key={`${res?.info?.id}-${idx}`} to={"/restaurant-menue/"+res?.info?.id}>
            {res?.info?.aggregatedDiscountInfoV3 ?(<ResWithDiscount key={`${res?.info?.id}-${idx}`} resList={res}/>):
             (<ResCard key={`${res?.info?.id}-${idx}`} resList={res} />)
            }
             </NavLink>;
        })}
      </div>
      {isFetchingMore && (
        <div className="text-center p-4 font-bold">
          Loading more restaurants...
        </div>
      )}
 </div>
  );
}

export default Body;
