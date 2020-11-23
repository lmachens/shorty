import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    background-color: #eef5f9;
    color: #3b3e51;
    font-family: 'Agave', sans-serif;
  }

  body {
    margin: 0;
  }
`;

export default GlobalStyle;
