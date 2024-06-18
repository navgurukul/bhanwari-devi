import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PythonContext, suppressedMessages } from "../providers/PythonProvider";
import { proxy, wrap } from "comlink";
import useFilesystem from "./useFilesystem";

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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

export default function usePython(props) {
  var _this = this;
  var _a = (props !== null && props !== void 0 ? props : {}).packages,
    packages = _a === void 0 ? {} : _a;
  var _b = __read(useState(false), 2),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = __read(useState(), 2),
    pyodideVersion = _c[0],
    setPyodideVersion = _c[1];
  var _d = __read(useState(false), 2),
    isRunning = _d[0],
    setIsRunning = _d[1];
  var _e = __read(useState([]), 2),
    output = _e[0],
    setOutput = _e[1];
  var _f = __read(useState(""), 2),
    stdout = _f[0],
    setStdout = _f[1];
  var _g = __read(useState(""), 2),
    stderr = _g[0],
    setStderr = _g[1];
  var _h = __read(useState(), 2),
    pendingCode = _h[0],
    setPendingCode = _h[1];
  var _j = __read(useState(false), 2),
    hasRun = _j[0],
    setHasRun = _j[1];
  var _k = useContext(PythonContext),
    globalPackages = _k.packages,
    timeout = _k.timeout,
    lazy = _k.lazy,
    terminateOnCompletion = _k.terminateOnCompletion;
  var workerRef = useRef();
  var runnerRef = useRef();
  var _l = useFilesystem({
      runner:
        runnerRef === null || runnerRef === void 0 ? void 0 : runnerRef.current,
    }),
    readFile = _l.readFile,
    writeFile = _l.writeFile,
    mkdir = _l.mkdir,
    rmdir = _l.rmdir,
    watchModules = _l.watchModules,
    unwatchModules = _l.unwatchModules,
    watchedModules = _l.watchedModules;
  var createWorker = function () {
    var worker = new Worker(
      process.env.PUBLIC_URL + "/js/react-py/workers/python-worker.js"
      // { type: 'module' }
    );
    workerRef.current = worker;
  };
  useEffect(function () {
    if (!lazy) {
      // Spawn worker on mount
      createWorker();
    }
    // Cleanup worker on unmount
    return function () {
      cleanup();
    };
  }, []);
  var allPackages = useMemo(
    function () {
      var _a, _b, _c, _d;
      var official = __spreadArray(
        [],
        __read(
          new Set(
            __spreadArray(
              __spreadArray(
                [],
                __read(
                  (_a = globalPackages.official) !== null && _a !== void 0
                    ? _a
                    : []
                ),
                false
              ),
              __read(
                (_b = packages.official) !== null && _b !== void 0 ? _b : []
              ),
              false
            )
          )
        ),
        false
      );
      var micropip = __spreadArray(
        [],
        __read(
          new Set(
            __spreadArray(
              __spreadArray(
                [],
                __read(
                  (_c = globalPackages.micropip) !== null && _c !== void 0
                    ? _c
                    : []
                ),
                false
              ),
              __read(
                (_d = packages.micropip) !== null && _d !== void 0 ? _d : []
              ),
              false
            )
          )
        ),
        false
      );
      return [official, micropip];
    },
    [globalPackages, packages]
  );
  var isReady = !isLoading && !!pyodideVersion;
  useEffect(
    function () {
      if (workerRef.current && !isReady) {
        var init = function () {
          return __awaiter(_this, void 0, void 0, function () {
            var runner, error_1;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, 3, 4]);
                  setIsLoading(true);
                  runner = wrap(workerRef.current);
                  runnerRef.current = runner;
                  return [
                    4 /*yield*/,
                    runner.init(
                      proxy(function (msg) {
                        // Suppress messages that are not useful for the user
                        if (suppressedMessages.includes(msg)) {
                          return;
                        }
                        setOutput(function (prev) {
                          return __spreadArray(
                            __spreadArray([], __read(prev), false),
                            [msg],
                            false
                          );
                        });
                      }),
                      proxy(function (_a) {
                        var version = _a.version;
                        // The runner is ready once the Pyodide version has been set
                        setPyodideVersion(version);
                        console.debug("Loaded pyodide version:", version);
                      }),
                      allPackages
                    ),
                  ];
                case 1:
                  _a.sent();
                  return [3 /*break*/, 4];
                case 2:
                  error_1 = _a.sent();
                  console.error("Error loading Pyodide:", error_1);
                  return [3 /*break*/, 4];
                case 3:
                  setIsLoading(false);
                  return [7 /*endfinally*/];
                case 4:
                  return [2 /*return*/];
              }
            });
          });
        };
        init();
      }
    },
    [workerRef.current]
  );
  // Immediately set stdout upon receiving new input
  useEffect(
    function () {
      if (output.length > 0) {
        setStdout(output.join("\n"));
      }
    },
    [output]
  );
  // React to ready state and run delayed code if pending
  useEffect(
    function () {
      if (pendingCode && isReady) {
        var delayedRun = function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [4 /*yield*/, runPython(pendingCode)];
                case 1:
                  _a.sent();
                  setPendingCode(undefined);
                  return [2 /*return*/];
              }
            });
          });
        };
        delayedRun();
      }
    },
    [pendingCode, isReady]
  );
  // React to run completion and run cleanup if worker should terminate on completion
  useEffect(
    function () {
      if (terminateOnCompletion && hasRun && !isRunning) {
        cleanup();
        setIsRunning(false);
        setPyodideVersion(undefined);
      }
    },
    [terminateOnCompletion, hasRun, isRunning]
  );
  var pythonRunnerCode =
    "\nimport sys\n\nsys.tracebacklimit = 0\n\nimport time\ndef sleep(seconds):\n    start = now = time.time()\n    while now - start < seconds:\n        now = time.time()\ntime.sleep = sleep\n\ndef run(code, preamble=''):\n    globals_ = {}\n    try:\n        exec(preamble, globals_)\n        code = compile(code, 'code', 'exec')\n        exec(code, globals_)\n    except Exception:\n        type_, value, tracebac = sys.exc_info()\n        tracebac = tracebac.tb_next\n        raise value.with_traceback(tracebac)\n    finally:\n        print()\n";
  // prettier-ignore
  var moduleReloadCode = function (modules) { return "\nimport importlib\nimport sys\n".concat(Array.from(modules).map(function (name) { return "\nif \"\"\"".concat(name, "\"\"\" in sys.modules:\n    importlib.reload(sys.modules[\"\"\"").concat(name, "\"\"\"])\n"); }).join(''), "\ndel importlib\ndel sys\n"); };
  var runPython = useCallback(
    function (code, preamble) {
      if (preamble === void 0) {
        preamble = "";
      }
      return __awaiter(_this, void 0, void 0, function () {
        var timeoutTimer, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              // Clear stdout and stderr
              setStdout("");
              setStderr("");
              if (lazy && !isReady) {
                // Spawn worker and set pending code
                createWorker();
                setPendingCode(code);
                return [2 /*return*/];
              }
              code = ""
                .concat(pythonRunnerCode, "\n\nrun(")
                .concat(JSON.stringify(code), ", ")
                .concat(JSON.stringify(preamble), ")");
              if (!isReady) {
                throw new Error("Pyodide is not loaded yet");
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 5, 6, 7]);
              setIsRunning(true);
              setHasRun(true);
              // Clear output
              setOutput([]);
              if (!isReady || !runnerRef.current) {
                throw new Error("Pyodide is not loaded yet");
              }
              if (timeout > 0) {
                timeoutTimer = setTimeout(function () {
                  setStdout("");
                  setStderr(
                    "Execution timed out. Reached limit of ".concat(
                      timeout,
                      " ms."
                    )
                  );
                  interruptExecution();
                }, timeout);
              }
              if (!(watchedModules.size > 0)) return [3 /*break*/, 3];
              return [
                4 /*yield*/,
                runnerRef.current.run(moduleReloadCode(watchedModules)),
              ];
            case 2:
              _a.sent();
              _a.label = 3;
            case 3:
              return [
                4 /*yield*/,
                runnerRef.current.run(code),
                // eslint-disable-next-line
              ];
            case 4:
              _a.sent();
              return [3 /*break*/, 7];
            case 5:
              error_2 = _a.sent();
              setStderr(
                "Traceback (most recent call last):\n" + error_2.message
              );
              return [3 /*break*/, 7];
            case 6:
              setIsRunning(false);
              clearTimeout(timeoutTimer);
              return [7 /*endfinally*/];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    },
    [lazy, isReady, timeout, watchedModules]
  );
  var interruptExecution = function () {
    cleanup();
    setIsRunning(false);
    setPyodideVersion(undefined);
    setOutput([]);
    // Spawn new worker
    createWorker();
  };
  var cleanup = function () {
    if (!workerRef.current) {
      return;
    }
    console.debug("Terminating worker");
    workerRef.current.terminate();
  };
  return {
    runPython: runPython,
    stdout: stdout,
    stderr: stderr,
    isLoading: isLoading,
    isReady: isReady,
    isRunning: isRunning,
    interruptExecution: interruptExecution,
    readFile: readFile,
    writeFile: writeFile,
    mkdir: mkdir,
    rmdir: rmdir,
    watchModules: watchModules,
    unwatchModules: unwatchModules,
  };
}
