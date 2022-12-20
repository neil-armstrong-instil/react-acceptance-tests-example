import {platform, arch} from "os";
import {isArm64} from "@src/utils/platform/TestRunnerCpuArchitecture";
import {execSync} from "child_process";

export function localElectronExecutablePath(): string {
  switch (platform()) {
    case "darwin":
      if (!isArm64()) throw new Error(`Unknown path for macos cpu architecture ${arch()}`);

      return `${pathToDistFolder()}/mac-arm64/Acceptance Test Example.app/Contents/MacOS/Acceptance Test Example`;
    case "linux":
      console.log("Electron directory", execSync(`ls ${pathToDistFolder()}/linux-unpacked`).toString());
      return `${pathToDistFolder()}/linux-unpacked/acceptance-test-example-electron`;
    default:
      throw new Error(`Unknown platform, figure out what the electron folder is called for the platform '${platform}' in the folder '${pathToDistFolder()}'`);
  }
}

function pathToDistFolder(): string {
  const pathFromRepositoryRoot = "electron/dist";

  const currentWorkingDirectory = process.cwd();
  if (currentWorkingDirectory.includes("acceptance-tests")) {
    return `../${pathFromRepositoryRoot}`;
  }

  return pathFromRepositoryRoot;
}
