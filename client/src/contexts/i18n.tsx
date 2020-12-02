import React, { ReactNode, useContext, useState } from "react";
import deDict from "./de.json";
import enDict from "./en.json";

export const I18nContext = React.createContext(null);

export const localeDicts = {
  de: deDict,
  en: enDict,
};

interface Props {
  children: ReactNode;
}
export const I18nProvider = ({ children }: Props) => {
  const [dict, setDict] = useState(localeDicts.de);

  const changeDict = (locale) => {
    setDict(localeDicts[locale]);
  };

  return (
    <I18nContext.Provider value={{ dict, changeDict }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
export const useDict = () => useI18n().dict;
export const useChangeDict = () => useI18n().changeDict;
