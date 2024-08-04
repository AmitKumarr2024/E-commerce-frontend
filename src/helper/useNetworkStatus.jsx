import { useEffect, useState } from "react";

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isConnectionRestored, setIsConnectionRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsConnectionRestored(true);
      setTimeout(() => setIsConnectionRestored(false), 1000); // Reset after 1 seconds
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return { isOnline, isConnectionRestored };
}

export default useNetworkStatus;
