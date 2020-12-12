import React from "react";
import useSubscription from "../hooks/useSubscription";

const Subscription = () => {
  const [subscription, subscribeUser] = useSubscription();

  return (
    <div>
      <p>
        {subscription
          ? `Subscription expires in ${subscription.expirationTime}`
          : "Not subscribed"}
      </p>
      <button onClick={() => subscribeUser()}>Subscribe</button>
    </div>
  );
};

export default Subscription;
