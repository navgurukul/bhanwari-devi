export var ConsoleState;
(function (ConsoleState) {
  ConsoleState[(ConsoleState["complete"] = 0)] = "complete";
  ConsoleState[(ConsoleState["incomplete"] = 1)] = "incomplete";
  ConsoleState[(ConsoleState["syntax-error"] = 2)] = "syntax-error";
})(ConsoleState || (ConsoleState = {}));
