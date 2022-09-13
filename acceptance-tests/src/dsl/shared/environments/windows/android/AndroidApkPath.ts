const apkName = "app-debug.apk";

export const androidApkPath = figureOutAndroidApkPath();

function figureOutAndroidApkPath(): string {
  const outputsFolder = pathToOutputsFolder();
  return `${outputsFolder}/${apkName}`;
}

function pathToOutputsFolder(): string {
  const pathFromRepositoryRoot = "android/app/build/outputs/apk/debug";

  const currentWorkingDirectory = process.cwd();
  if (currentWorkingDirectory.includes("acceptance-tests")) {
    return `../${pathFromRepositoryRoot}`;
  }

  return pathFromRepositoryRoot;
}
