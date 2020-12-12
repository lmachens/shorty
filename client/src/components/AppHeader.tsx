import React from "react";
import styled from "styled-components";
import LocaleSelect from "./LocaleSelect";
import logoSrc from "../assets/logo.svg";
import { useDict } from "../contexts/i18n";

const Header = styled.header`
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5em;
  }

  h1 {
    flex-grow: 1;
  }
`;

const AppHeader = () => {
  const dict = useDict();

  return (
    <Header>
      <img src={logoSrc} alt={dict.logoAlt} />
      <h1>shorty</h1>
      <LocaleSelect />
    </Header>
  );
};

export default AppHeader;
