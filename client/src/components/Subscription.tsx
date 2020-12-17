import React from "react";
import styled from "styled-components";
import { useDict } from "../contexts/i18n";
import useSubscription from "../hooks/useSubscription";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

const Subscription = () => {
  const [subscription, subscribe] = useSubscription();
  const dict = useDict();

  return (
    <Container>
      <span>{subscription ? dict.subscribed : dict.notSubscribed}</span>
      <button onClick={() => subscribe()}>{dict.subscribe}</button>
    </Container>
  );
};

export default Subscription;
