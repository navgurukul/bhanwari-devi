import { Packages } from "../types/Packages";
import { ConsoleState } from "../types/Console";
interface UsePythonConsoleProps {
  packages?: Packages;
}
export default function usePythonConsole(props?: UsePythonConsoleProps): {
  runPython: (code: string) => Promise<void>;
  stdout: string;
  stderr: string;
  isLoading: boolean;
  isReady: boolean;
  isRunning: boolean;
  interruptExecution: () => void;
  readFile: (name: string) => Promise<void> | undefined;
  writeFile: (name: string, data: string) => Promise<void> | undefined;
  mkdir: (name: string) => Promise<void> | undefined;
  rmdir: (name: string) => Promise<void> | undefined;
  watchModules: (moduleNames: string[]) => void;
  unwatchModules: (moduleNames: string[]) => void;
  banner: string | undefined;
  consoleState: ConsoleState | undefined;
};
export {};
