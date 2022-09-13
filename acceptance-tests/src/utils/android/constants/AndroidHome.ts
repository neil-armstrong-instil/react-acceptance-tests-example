export function androidHome(): string {
  if (!process.env.ANDROID_HOME) {
    throw new Error("Android is not setup, please install android studio and install some emulators");
  }

  return process.env.ANDROID_HOME;
}
