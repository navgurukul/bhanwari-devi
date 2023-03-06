var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __values =
  (this && this.__values) ||
  function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        },
      };
    throw new TypeError(
      s ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  };
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
importScripts("https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js");
// Monkey patch console.log to prevent the script from outputting logs
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log = function () {};
import { expose } from "comlink";
var initConsoleCode =
  '\nimport sys\nfrom pyodide.ffi import to_js\nfrom pyodide.console import PyodideConsole, repr_shorten, BANNER\nimport __main__\nBANNER = "Welcome to the Pyodide terminal emulator \uD83D\uDC0D\\n" + BANNER\npyconsole = PyodideConsole(__main__.__dict__)\nimport builtins\nasync def await_fut(fut):\n  res = await fut\n  if res is not None:\n    builtins._ = res\n  return to_js([res], depth=1)\ndef clear_console():\n  pyconsole.buffer = []\n';
var pythonConsole;
var python = {
  init: function (stdout, onLoad, packages) {
    return __awaiter(this, void 0, void 0, function () {
      var _a,
        micropip,
        version,
        namespace,
        reprShorten,
        banner,
        awaitFut,
        pyconsole,
        clearConsole;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = self;
            return [4 /*yield*/, self.loadPyodide({})];
          case 1:
            _a.pyodide = _b.sent();
            if (!(packages[0].length > 0)) return [3 /*break*/, 3];
            return [4 /*yield*/, self.pyodide.loadPackage(packages[0])];
          case 2:
            _b.sent();
            _b.label = 3;
          case 3:
            if (!(packages[1].length > 0)) return [3 /*break*/, 6];
            return [4 /*yield*/, self.pyodide.loadPackage(["micropip"])];
          case 4:
            _b.sent();
            micropip = self.pyodide.pyimport("micropip");
            return [4 /*yield*/, micropip.install(packages[1])];
          case 5:
            _b.sent();
            _b.label = 6;
          case 6:
            version = self.pyodide.version;
            namespace = self.pyodide.globals.get("dict")();
            return [
              4 /*yield*/,
              self.pyodide.runPythonAsync(initConsoleCode, {
                globals: namespace,
              }),
            ];
          case 7:
            _b.sent();
            reprShorten = namespace.get("repr_shorten");
            banner = namespace.get("BANNER");
            awaitFut = namespace.get("await_fut");
            pyconsole = namespace.get("pyconsole");
            clearConsole = namespace.get("clear_console");
            namespace.destroy();
            // eslint-disable-next-line camelcase
            pyconsole.stdout_callback = stdout;
            pythonConsole = {
              reprShorten: reprShorten,
              awaitFut: awaitFut,
              pyconsole: pyconsole,
              clearConsole: clearConsole,
            };
            onLoad({ version: version, banner: banner });
            return [2 /*return*/];
        }
      });
    });
  },
  run: function (code) {
    return __awaiter(this, void 0, void 0, function () {
      var state, _a, _b, line, fut, wrapped, _c, value, error_1, message, e_1_1;
      var e_1, _d;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            if (!pythonConsole) {
              throw new Error("Console has not been initialised");
            }
            if (code === undefined) {
              throw new Error("No code to push");
            }
            _e.label = 1;
          case 1:
            _e.trys.push([1, 9, 10, 11]);
            (_a = __values(code.split("\n"))), (_b = _a.next());
            _e.label = 2;
          case 2:
            if (!!_b.done) return [3 /*break*/, 8];
            line = _b.value;
            fut = pythonConsole.pyconsole.push(line);
            state = fut.syntax_check;
            wrapped = pythonConsole.awaitFut(fut);
            _e.label = 3;
          case 3:
            _e.trys.push([3, 5, 6, 7]);
            return [4 /*yield*/, wrapped];
          case 4:
            (_c = __read.apply(void 0, [_e.sent(), 1])), (value = _c[0]);
            if (self.pyodide.isPyProxy(value)) {
              value.destroy();
            }
            return [3 /*break*/, 7];
          case 5:
            error_1 = _e.sent();
            if (error_1.constructor.name === "PythonError") {
              message = fut.formatted_error || error_1.message;
              return [2 /*return*/, { state: state, error: message.trimEnd() }];
            } else {
              throw error_1;
            }
            return [3 /*break*/, 7];
          case 6:
            fut.destroy();
            wrapped.destroy();
            return [7 /*endfinally*/];
          case 7:
            _b = _a.next();
            return [3 /*break*/, 2];
          case 8:
            return [3 /*break*/, 11];
          case 9:
            e_1_1 = _e.sent();
            e_1 = { error: e_1_1 };
            return [3 /*break*/, 11];
          case 10:
            try {
              if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            } finally {
              if (e_1) throw e_1.error;
            }
            return [7 /*endfinally*/];
          case 11:
            return [2 /*return*/, { state: state }];
        }
      });
    });
  },
  readFile: function (name) {
    return self.pyodide.FS.readFile(name, { encoding: "utf8" });
  },
  writeFile: function (name, data) {
    return self.pyodide.FS.writeFile(name, data, { encoding: "utf8" });
  },
  mkdir: function (name) {
    self.pyodide.FS.mkdir(name);
  },
  rmdir: function (name) {
    self.pyodide.FS.rmdir(name);
  },
};
expose(python);
