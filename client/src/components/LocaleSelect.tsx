import React, { useContext } from "react";
import { I18nContext } from "../contexts/i18n";

const LocaleSelect = () => {
  const { changeDict } = useContext(I18nContext);

  return (
    <select onChange={(event) => changeDict(event.target.value)}>
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LocaleSelect;
