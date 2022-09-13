import {androidHome} from "./constants/AndroidHome";
import {execSync} from "child_process";

export const avdManager = (params: string): string => executeSyncWithResult(`${androidHome()}/cmdline-tools/latest/bin/avdmanager ${params}`);
export const sdkManager = (params: string): string => executeSyncWithResult(`${androidHome()}/cmdline-tools/latest/bin/sdkmanager ${params}`);
export const adb = (params: string): string => executeSyncWithResult(`${androidHome()}/platform-tools/adb ${params}`);

const executeSyncWithResult = (command: string): string => {
  const buffer = execSync(`yes | ${command}`);
  return Buffer.from(buffer).toString("utf-8");
};
