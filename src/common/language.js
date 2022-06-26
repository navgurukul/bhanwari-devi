import { useQuery } from "./url";
import { lang } from "../constant";
import en from "../msg/en";

export const useLanguage = () => {
  const hl = useQuery().get("hl") || localStorage.getItem("hl");
  const isLanguageSupported = Object.keys(lang).includes(hl);
  if (isLanguageSupported) {
    localStorage.setItem("hl", hl);
    return hl;
  } else {
    return "en"; // default to English
  }
};

export const getTranslationKey = (englishText) => {
  return Object.keys(en).find((key) => en[key] === englishText);
};
