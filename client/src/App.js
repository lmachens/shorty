import React from "react";
import Shorties from "./pages/Shorties";
import styled from "styled-components/macro";
import GlobalStyle from "./GlobalStyle";

const Container = styled.div`
  max-width: 1000px;
  width: 80%;
  margin: 0 auto;
`;

const App = () => (
  <>
    <GlobalStyle />
    <Container>
      <header>
        <h1>shorty</h1>
      </header>
      <main>
        <Shorties />
      </main>
    </Container>
  </>
);

export default App;
