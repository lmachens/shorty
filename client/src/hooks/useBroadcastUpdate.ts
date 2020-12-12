import { useEffect, useState } from "react";

const useBroadcastUpdate = (endpoint: string) => {
  const [latestUpdate, setLatestUpdate] = useState(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn("Service workers are not supported");
      return;
    }
    const handleMessage = async (event: MessageEvent) => {
      // Optional: ensure the message came from workbox-broadcast-update
      if (event.data.meta === "workbox-broadcast-update") {
        const { cacheName, updatedURL } = event.data.payload;

        // Do something with cacheName and updatedURL.
        // For example, get the cached content and update
        // the content on the page.
        const cache = await caches.open(cacheName);
        const updatedResponse = await cache.match(updatedURL);
        if (updatedResponse && updatedURL.endsWith(endpoint)) {
          const latestShorties = await updatedResponse.json();
          setLatestUpdate(latestShorties);
        }
      }
    };
    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, [endpoint]);

  return latestUpdate;
};

export default useBroadcastUpdate;
