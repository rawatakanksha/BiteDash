import { useEffect,useState } from "react";
import { MENUE_URL } from "./constants";

function useRestaurantMenu(resId){
   const[resInfo,setResInfo]=useState(null)
    useEffect(()=>{
       fetchData();
    },[])

    const fetchData=async ()=>{
        try{
        const data= await fetch(MENUE_URL+resId);
          const json=await data.json()
          setResInfo(json)
        }
        catch(error){
          console.error("error fetching data:",error)
        }
      
    }
  return resInfo;
}


export default useRestaurantMenu