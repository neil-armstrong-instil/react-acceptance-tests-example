import {platform, arch} from "os";
import {isArm64} from "@src/utils/platform/TestRunnerCpuArchitecture";

export function localElectronExecutablePath(): string {
  switch (platform()) {
    case "darwin":
      if (!isArm64()) throw new Error(`Unknown path for macos cpu architecture ${arch()}`);

      return `${pathToDistFolder()}/mac-arm64/Acceptance Test Example.app/Contents/MacOS/Acceptance Test Example`;
    case "linux":
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
