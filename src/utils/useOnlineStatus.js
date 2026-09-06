import { useState, useEffect } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
//   navigator.onLine (a built-in browser property that returns true or false for the current network status):

  useEffect(() => {
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });
    window.addEventListener("online", () => {
      setIsOnline(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setIsOnline(false);
      });
      window.removeEventListener("online", () => {
        setIsOnline(true);
      });
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;
