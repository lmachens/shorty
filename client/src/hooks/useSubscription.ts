import { useState } from "react";
import { getVAPID, subscribeNotifications } from "../api/subscriptions";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const useSubscription = (): [PushSubscription, () => Promise<void>] => {
  const [subscription, setSubscription] = useState<PushSubscription>(null);

  const subscribe = async () => {
    const status = await Notification.requestPermission();
    if (status !== "granted") {
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const { publicKey } = await getVAPID();
    const convertedVapidKey = urlBase64ToUint8Array(publicKey);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    const { keys } = subscription.toJSON();
    await subscribeNotifications({
      endpointURL: subscription.endpoint,
      auth: keys.auth,
      p256dh: keys.p256dh,
    });

    setSubscription(subscription);
  };
  return [subscription, subscribe];
};

export default useSubscription;
