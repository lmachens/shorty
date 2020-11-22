import React from "react";
import Shorties from "./pages/Shorties";
import styled from "styled-components/macro";

const Container = styled.div`
  max-width: 1000px;
  width: 80%;
  margin: 0 auto;
`;

const App = () => (
  <Container>
    <header>
      <h1>shorty</h1>
    </header>
    <main>
      <Shorties />
    </main>
  </Container>
);

export default App;
