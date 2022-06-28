import { useLanguageConstants, getTranslationKey } from "../../../common/language";

function Message({ constantKey, children }) {
  const { language, MSG } = useLanguageConstants();
  if (constantKey) {
    return MSG[constantKey];
  } else {
    const key = getTranslationKey(children);
    return key ? MSG[key] : children;
  }
}

export default Message;