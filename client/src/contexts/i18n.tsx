import React, { ReactNode, useContext, useEffect, useState } from "react";
// import deDict from "./de.json";
// import enDict from "./en.json";

export const I18nContext = React.createContext(null);

interface Props {
  children: ReactNode;
  lang?: string;
}
export const I18nProvider = ({ children, lang = "en" }: Props) => {
  const [dict, setDict] = useState({});
  const [locale, setLocale] = useState(lang);

  useEffect(() => {
    changeDict(lang);
  }, [lang]);

  const changeDict = async (locale) => {
    const dict = await import(`./${locale}.json`);
    setDict(dict);
    setLocale(locale);
  };

  return (
    <I18nContext.Provider value={{ dict, locale, changeDict }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
export const useDict = () => useI18n().dict;
export const useChangeDict = () => useI18n().changeDict;
export const useLocale = () => useI18n().locale;
