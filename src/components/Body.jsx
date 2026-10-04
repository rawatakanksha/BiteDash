import React, { useEffect, useState, useContext, useRef } from "react";
import ResCard from "./ResCard";
import Shimmer from "./ShimmerUI";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

function Body() {
  const [listRes, setListRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [nextOffSet, setNextOffSet] = useState("");
  const [isFetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // useRef to prevent race-condition duplicate requests during fast scrolling
  const isFetchingRef = useRef(false);
  const nextOffsetRef = useRef("");
  const hasMoreRef = useRef(true);

  const onlineStatus = useOnlineStatus();
  const { setUserName, loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to extract ALL restaurants across ALL grid cards in Swiggy's response
  const extractRestaurantsFromCards = (cards) => {
    if (!Array.isArray(cards)) return [];
    
    let allExtracted = [];
    cards.forEach((c) => {
      const resList =
        c?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        c?.card?.card?.infoWithStyle?.restaurants;
      if (Array.isArray(resList) && resList.length > 0) {
        allExtracted = [...allExtracted, ...resList];
      }
    });

    return allExtracted;
  };

  // 1. Initial Live Data Fetching
  const fetchData = async () => {
    try {
      const data = await fetch(
        "/api/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error(`HTTP Error ${data.status}`);
      }

      const json = await data.json();
      const cards = json?.data?.cards || [];

      // Extract all restaurants across initial cards
      const restaurants = extractRestaurantsFromCards(cards);

      // Extract nextOffset for infinite scrolling
      const offset =
        json?.data?.pageOffset?.nextOffset || json?.data?.nextOffset || "";

      if (offset) {
        setNextOffSet(offset);
        nextOffsetRef.current = offset;
      }

      if (restaurants && restaurants.length > 0) {
        setListRes(restaurants);
        setSearchList(restaurants);
      }
    } catch (error) {
      console.error("Swiggy GET API error:", error);
    }
  };

  // 2. High-Performance Infinite Scroll Live Data Fetching
  const fetchMoreRes = async () => {
    // Synchronous guard check using ref to prevent duplicate triggers
    if (isFetchingRef.current || !hasMoreRef.current || !nextOffsetRef.current) return;

    isFetchingRef.current = true;
    setFetchingMore(true);

    try {
      const currentOffset = nextOffsetRef.current;
      const url = `/api/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING&nextOffset=${encodeURIComponent(
        currentOffset
      )}`;

      const response = await fetch(url);

      if (!response.ok) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      const json = await response.json();
      const cards = json?.data?.cards || [];

      // Extract ALL restaurants across ALL cards returned in this page batch (up to 28+ items)
      const newRes = extractRestaurantsFromCards(cards);

      // Update nextOffset token for next scroll request
      const newOffset =
        json?.data?.pageOffset?.nextOffset || json?.data?.nextOffset || "";

      if (newOffset && newOffset !== currentOffset) {
        setNextOffSet(newOffset);
        nextOffsetRef.current = newOffset;
      } else {
        hasMoreRef.current = false;
        setHasMore(false);
      }

      if (newRes && newRes.length > 0) {
        setListRes((prev) => {
          const existingIds = new Set(prev.map((item) => item?.info?.id));
          const uniqueNew = newRes.filter((item) => !existingIds.has(item?.info?.id));
          return [...prev, ...uniqueNew];
        });

        setSearchList((prev) => {
          const existingIds = new Set(prev.map((item) => item?.info?.id));
          const uniqueNew = newRes.filter((item) => !existingIds.has(item?.info?.id));
          return [...prev, ...uniqueNew];
        });
      } else {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more live data from Swiggy API:", error);
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      // Release synchronous lock
      isFetchingRef.current = false;
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout) return;

      // Throttle scroll events to 100ms for smooth performance
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;

        // Pre-fetch 900px before user reaches the bottom for seamless, instant loading
        if (
          hasMoreRef.current &&
          !isFetchingRef.current &&
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 900
        ) {
          fetchMoreRes();
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [nextOffSet, hasMore]);

  // Filter handlers
  const handleSearch = () => {
    const filterData = listRes.filter((res) => {
      return res?.info?.name?.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchList(filterData);
    setActiveFilter("search");
  };

  const handleFilterTopRated = () => {
    const filterRes = listRes.filter((res) => res?.info?.avgRating >= 4.0);
    setSearchList(filterRes);
    setActiveFilter("topRated");
  };

  const handleFilterFastDelivery = () => {
    const filterRes = listRes.filter(
      (res) => (res?.info?.sla?.deliveryTime || 30) <= 25
    );
    setSearchList(filterRes);
    setActiveFilter("fast");
  };

  const handleFilterPureVeg = () => {
    const filterRes = listRes.filter((res) => res?.info?.veg === true);
    setSearchList(filterRes);
    setActiveFilter("veg");
  };

  const handleResetFilter = () => {
    setSearchText("");
    setSearchList(listRes);
    setActiveFilter("all");
  };

  if (onlineStatus === false) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4 text-3xl">
          📡
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You're Offline</h2>
        <p className="text-gray-500 max-w-md">
          Please check your internet connection to continue browsing restaurants.
        </p>
      </div>
    );
  }

  return listRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Hero Banner & Search Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white p-6 sm:p-10 mb-8 shadow-xl shadow-orange-500/10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Bengaluru Special 🚀
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Delicious meals delivered to your doorstep
          </h1>
          <p className="text-orange-100 text-sm sm:text-base mb-6 font-medium">
            Explore top rated restaurants, quick bites, and live deals directly from Swiggy.
          </p>

          {/* Search Controls Card */}
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/40 flex flex-col sm:flex-row gap-2 items-center text-gray-800">
            <div className="relative flex-1 w-full flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                className="w-full pl-10 pr-8 py-3 bg-transparent text-sm focus:outline-none text-gray-800 font-medium placeholder-gray-400"
                placeholder="Search for restaurants, cuisines..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {searchText && (
                <button
                  onClick={handleResetFilter}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* User Context & Greeting Pill */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/20 text-xs font-semibold">
          <span className="text-orange-100">User Profile:</span>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <input
              type="text"
              value={loggedInUser || ""}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none w-28 placeholder-white/70 border-b border-dashed border-white/50"
              placeholder="Your Name"
            />
          </div>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Restaurants near you
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Showing {searchList.length} live restaurants in Bengaluru
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            onClick={handleResetFilter}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Restaurants
          </button>

          <button
            onClick={handleFilterTopRated}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === "topRated"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>★</span>
            <span>Ratings 4.0+</span>
          </button>

          <button
            onClick={handleFilterFastDelivery}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === "fast"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>⚡</span>
            <span>Fast Delivery (&le;25m)</span>
          </button>

          <button
            onClick={handleFilterPureVeg}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === "veg"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 flex items-center justify-center p-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            </span>
            <span>Pure Veg</span>
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      {searchList.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 rounded-3xl border border-gray-100 my-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            No restaurants found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-4">
            We couldn't find any restaurant matching "{searchText}". Try searching for something else.
          </p>
          <button
            onClick={handleResetFilter}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-start -mx-2">
          {searchList.map((res, idx) => {
            return (
              <NavLink
                key={`${res?.info?.id}-${idx}`}
                to={"/restaurant-menue/" + res?.info?.id}
                className="focus:outline-none"
              >
                <ResCard resList={res} />
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Infinite Scroll Footer / Status */}
      {isFetchingMore && (
        <div className="flex items-center justify-center gap-3 p-6 my-4">
          <div className="w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-600">
            Loading more live restaurants from Swiggy...
          </span>
        </div>
      )}

      {!hasMore && (
       <div className="text-center py-8 text-xs font-semibold text-gray-400 border-t border-gray-100 mt-8">
          ✨ You've reached the end of live restaurants.
        </div>
      )}
    </div>
  );
}

export default Body;
