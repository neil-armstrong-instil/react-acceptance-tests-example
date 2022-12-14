export function screenshotsDirectory(): string {
  return `${pathToPackageRoot()}/screenshots`;
}

export function pathToPackageRoot(): string {
  const acceptanceTestsPackageFolderName = "acceptance-tests";

  const currentWorkingDirectory = process.cwd();
  if (currentWorkingDirectory.includes(acceptanceTestsPackageFolderName)) return currentWorkingDirectory;

  return `${currentWorkingDirectory}/${acceptanceTestsPackageFolderName}`;
}
