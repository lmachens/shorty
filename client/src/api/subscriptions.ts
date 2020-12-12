import { fetchApi } from "./utils";
import { Subscription } from "../../../types/subscriptions";

type VAPID = {
  publicKey: string;
};
export const getVAPID = () => {
  return fetchApi<VAPID>("/api/vapid");
};

export const subscribe = (subscription: Subscription) => {
  return fetchApi("/api/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
};
