/// <reference types="react" />
import { Packages } from "../types/Packages";
declare const PythonContext: import("react").Context<{
  packages: Packages;
  timeout: number;
  lazy: boolean;
  terminateOnCompletion: boolean;
}>;
export declare const suppressedMessages: string[];
interface PythonProviderProps {
  packages?: Packages;
  timeout?: number;
  lazy?: boolean;
  terminateOnCompletion?: boolean;
  children: any;
}
declare function PythonProvider(props: PythonProviderProps): JSX.Element;
export { PythonContext, PythonProvider };
