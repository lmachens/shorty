import React, { useState } from "react";
import Shorties from "./pages/Shorties";
import styled from "styled-components/macro";
import GlobalStyle from "./GlobalStyle";
import logoSrc from "./assets/logo.svg";
import { I18nContext } from "./contexts/i18n";

const Container = styled.div`
  max-width: 1000px;
  width: 80%;
  margin: 0 auto;

  header {
    display: flex;

    img {
      margin-right: 0.5em;
    }
  }
`;

const localeDicts = {
  de: {
    target: "Ziel",
    views: "Ansichten",
  },
  en: {
    target: "Target",
    views: "Views",
  },
};

const App = () => {
  const [dict, setDict] = useState(localeDicts.de);

  return (
    <I18nContext.Provider value={dict}>
      <GlobalStyle />
      <Container>
        <header>
          <img src={logoSrc} alt="shorty Logo with pants" />
          <h1>shorty</h1>
          <select
            onChange={(event) => setDict(localeDicts[event.target.value])}
          >
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>
        </header>
        <main>
          <Shorties />
        </main>
      </Container>
    </I18nContext.Provider>
  );
};

export default App;
