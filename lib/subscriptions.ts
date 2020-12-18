import { FilterQuery } from "mongodb";
import webPush from "web-push";
import { Subscription } from "../types/subscriptions";
import { collection } from "./database";

export const initializeWebPush = (
  vapidSubject,
  vapidPublicKey,
  vapidPrivateKey
) => {
  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
};

export const broadcastMessage = async (message) => {
  const subscriptions = await findSubscriptions();
  subscriptions.forEach((subscription) => {
    const pushSubscription = {
      endpoint: subscription.endpointURL,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    };

    const payload = message;

    const options = {
      TTL: 60,
    };

    webPush.sendNotification(pushSubscription, payload, options);
  });
};

export const getSubscriptionsCollection = () =>
  collection<Subscription>("subscriptions");
export const findSubscriptions = (query: FilterQuery<Subscription> = {}) =>
  getSubscriptionsCollection().find(query).toArray();
export const insertSubscription = (newSubscription: Subscription) =>
  getSubscriptionsCollection().insertOne(newSubscription);
