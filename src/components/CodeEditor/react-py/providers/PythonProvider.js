import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from "react";

var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };

var PythonContext = createContext({
  packages: {},
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
});
export var suppressedMessages = ["Python initialization complete"];
function PythonProvider(props) {
  var _a = props.packages,
    packages = _a === void 0 ? {} : _a,
    _b = props.timeout,
    timeout = _b === void 0 ? 0 : _b,
    _c = props.lazy,
    lazy = _c === void 0 ? false : _c,
    _d = props.terminateOnCompletion,
    terminateOnCompletion = _d === void 0 ? false : _d;
  return _jsx(
    PythonContext.Provider,
    __assign(
      {
        value: {
          packages: packages,
          timeout: timeout,
          lazy: lazy,
          terminateOnCompletion: terminateOnCompletion,
        },
      },
      props
    )
  );
}
export { PythonContext, PythonProvider };
