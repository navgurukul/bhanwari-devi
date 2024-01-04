import { lang } from "../constant";
import en from "./en";
import hi from "./hi";

const MSG = { en, hi }; //, mr, ta, te};

// Default language constants to English
Object.keys(lang).forEach((lang) => (MSG[lang] = { ...en, ...MSG[lang] }));

export default MSG;
