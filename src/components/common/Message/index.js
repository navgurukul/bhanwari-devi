import {
  useLanguageConstants,
  getTranslationKey,
} from "../../../common/language";

function Message({ constantKey, children, args = [] }) {
  const { language, MSG } = useLanguageConstants();
  const key = constantKey || getTranslationKey(children);

  if (key) {
    return MSG[key]?.split(/(%\d+)/g).map((part) => {
      if (/^%\d+/.test(part) && parseInt(part.substring(1)) <= args.length) {
        return args[parseInt(part.substring(1)) - 1];
      } else {
        return part;
      }
    });
  } else {
    return children;
  }
}

export default Message;
