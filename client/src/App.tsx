import React from "react";
import Shorties from "./pages/Shorties";
import styled from "styled-components/macro";
import GlobalStyle from "./GlobalStyle";
import { I18nProvider } from "./contexts/i18n";
import AppHeader from "./components/AppHeader";
import Subscription from "./components/Subscription";

const Container = styled.div`
  max-width: 1000px;
  width: 80%;
  margin: 0 auto;
`;

const getLocale = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("lang") || "en";
};

const App = () => {
  return (
    <I18nProvider lang={getLocale()}>
      <GlobalStyle />
      <Container>
        <AppHeader />
        <main>
          <Subscription />
          <Shorties />
        </main>
      </Container>
    </I18nProvider>
  );
};

export default App;
