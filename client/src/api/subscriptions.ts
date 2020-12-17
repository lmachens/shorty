import { fetchApi } from "./utils";

type VAPID = {
  publicKey: string;
};
export const getVAPID = () => {
  return fetchApi<VAPID>("/api/vapid");
};

type Subscription = {
  endpointURL: string;
  auth: string;
  p256dh: string;
};
export const subscribeNotifications = (subscription: Subscription) => {
  return fetchApi("/api/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
};
