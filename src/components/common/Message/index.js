import {
  useLanguageConstants,
  getTranslationKey,
} from "../../../common/language";

function Message({ constantKey, children, args = [] }) {
  const { language, MSG } = useLanguageConstants();
  const key = constantKey || getTranslationKey(children);

  if (key) {
    if (!MSG[key]) {
      console.warn("Message key", key, "does not exist. Using", key, ". Please update the message constants.");
      return key;
    } else {
      return MSG[key]?.split(/(%\d+)/g).map((part) => {
        if (/^%\d+/.test(part) && parseInt(part.substring(1)) <= args.length) {
          return args[parseInt(part.substring(1)) - 1];
        } else {
          return part;
        }
      });
    }
  } else {
    return children;
  }
}

export default Message;
