import { useState } from "react";

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
export default function useFilesystem(props) {
  var runner = props.runner;
  var _a = __read(useState(new Set()), 2),
    watchedModules = _a[0],
    setWatchedModules = _a[1];
  var readFile = function (name) {
    return runner === null || runner === void 0
      ? void 0
      : runner.readFile(name);
  };
  var writeFile = function (name, data) {
    return runner === null || runner === void 0
      ? void 0
      : runner.writeFile(name, data);
  };
  var mkdir = function (name) {
    return runner === null || runner === void 0 ? void 0 : runner.mkdir(name);
  };
  var rmdir = function (name) {
    return runner === null || runner === void 0 ? void 0 : runner.rmdir(name);
  };
  var watchModules = function (moduleNames) {
    setWatchedModules(function (prev) {
      return new Set(
        __spreadArray(
          __spreadArray([], __read(prev), false),
          __read(moduleNames),
          false
        )
      );
    });
  };
  var unwatchModules = function (moduleNames) {
    setWatchedModules(function (prev) {
      return new Set(
        __spreadArray([], __read(prev), false).filter(function (e) {
          return !moduleNames.includes(e);
        })
      );
    });
  };
  return {
    readFile: readFile,
    writeFile: writeFile,
    mkdir: mkdir,
    rmdir: rmdir,
    watchModules: watchModules,
    unwatchModules: unwatchModules,
    watchedModules: watchedModules,
  };
}
