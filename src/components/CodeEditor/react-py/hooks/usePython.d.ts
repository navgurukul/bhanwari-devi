import { Packages } from "../types/Packages";
interface UsePythonProps {
  packages?: Packages;
}
export default function usePython(props?: UsePythonProps): {
  runPython: (code: string, preamble?: string) => Promise<void>;
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
};
export {};
