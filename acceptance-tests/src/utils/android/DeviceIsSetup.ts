import {avdManager} from "./Commands";
import {androidVirtualDeviceDeviceName} from "./constants/DeviceName";

export function androidVirtualDeviceIsSetup(): boolean {
  return getAllSetupDevices().includes(androidVirtualDeviceDeviceName);
}

function getAllSetupDevices(): string[] {
  const result = avdManager("list");
  return result
    .split("Available devices definitions:")[0]
    .split("\n")
    .filter(line => line.includes("Name"))
    .map(line => {
      return line
        .trim()
        .replace("Name: ", "");
    });
}
