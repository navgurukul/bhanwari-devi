interface Pyodide {
  loadPackage: (packages: string[]) => Promise<void>;
  pyimport: (pkg: string) => micropip;
  runPythonAsync: (code: string, namespace?: any) => Promise<void>;
  version: string;
  FS: {
    readFile: (name: string, options: unknown) => void;
    writeFile: (name: string, data: string, options: unknown) => void;
    mkdir: (name: string) => void;
    rmdir: (name: string) => void;
  };
  globals: any;
  isPyProxy: (value: unknown) => boolean;
}
interface micropip {
  install: (packages: string[]) => Promise<void>;
}
declare global {
  interface Window {
    loadPyodide: ({
      stdout,
    }: {
      stdout?: (msg: string) => void;
    }) => Promise<Pyodide>;
    pyodide: Pyodide;
  }
}
export {};
