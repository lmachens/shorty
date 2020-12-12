import React from "react";
import styled from "styled-components/macro";
import { useI18n } from "../contexts/i18n";

const Select = styled.select`
  padding: 0.4em;
`;

const LocaleSelect = () => {
  const { changeDict, locale } = useI18n();

  return (
    <Select onChange={(event) => changeDict(event.target.value)} value={locale}>
      <option value="de">🇩🇪&emsp;German</option>
      <option value="en">🇺🇸&emsp;English</option>
    </Select>
  );
};

export default LocaleSelect;
