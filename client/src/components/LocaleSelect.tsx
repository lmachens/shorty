import React, { useContext } from "react";
import { I18nContext, localeDicts } from "../contexts/i18n";

const LocaleSelect = () => {
  const { setDict } = useContext(I18nContext);

  return (
    <select onChange={(event) => setDict(localeDicts[event.target.value])}>
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LocaleSelect;
