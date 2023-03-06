import { Remote } from "comlink";
import { Runner } from "../types/Runner";
interface UseFilesystemProps {
  runner: Remote<Runner> | undefined;
}
export default function useFilesystem(props: UseFilesystemProps): {
  readFile: (name: string) => Promise<void> | undefined;
  writeFile: (name: string, data: string) => Promise<void> | undefined;
  mkdir: (name: string) => Promise<void> | undefined;
  rmdir: (name: string) => Promise<void> | undefined;
  watchModules: (moduleNames: string[]) => void;
  unwatchModules: (moduleNames: string[]) => void;
  watchedModules: Set<string>;
};
export {};
