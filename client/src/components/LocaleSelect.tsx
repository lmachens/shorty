import React from "react";
import { useChangeDict } from "../contexts/i18n";

const LocaleSelect = () => {
  const changeDict = useChangeDict();

  return (
    <select onChange={(event) => changeDict(event.target.value)}>
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LocaleSelect;
