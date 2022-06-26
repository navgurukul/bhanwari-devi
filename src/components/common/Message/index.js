import { useLanguageConstants, getTranslationKey } from "../../../common/language";

function Message({ constantName, children }) {
  const { language, MSG } = useLanguageConstants();
  if (constantName) {
    return MSG[constantName];
  } else {
    const key = getTranslationKey(children);
    return key ? MSG[key] : children;
  }
}

export default Message;