import {androidVirtualDeviceDeviceName} from "@src/utils/android/constants/DeviceName";
import {avdManager, sdkManager} from "@src/utils/android/Commands";
import {androidVirtualDeviceIsSetup} from "@src/utils/android/DeviceIsSetup";
import type {AndroidCpuArchitecture} from "@src/utils/android/types/AndroidCpuArchitecture";
import {isArm64} from "@src/utils/platform/TestRunnerCpuArchitecture";

function createAndroidVirtualDevice(): void {
  if (androidVirtualDeviceIsSetup()) {
    console.log("Device already setup, so you are good to go!");
    return;
  }

  if (!hasSystemImageDownloaded()) {
    console.log("No system image detected, installing system image...(this may take a while)...");
    installSystemImage();
    console.log("System image Installed!\n");
  }

  console.log("Creating android virtual device...");
  createDevice();
  console.log(`Android virtual device created with name "${androidVirtualDeviceDeviceName}"!\n`);
}

function hasSystemImageDownloaded(): boolean {
  const installedSystemImages = getInstalledSystemImages();

  if (isArm64()) {
    return installedSystemImages.findIndex(systemImage => systemImage.includes(systemImageWithArch("arm64-v8a"))) !== -1;
  }

  return installedSystemImages.findIndex(systemImage => systemImage.includes(systemImageWithArch("x86"))) !== -1;
}

function getInstalledSystemImages(): string[] {
  const sdkManagerResult = sdkManager("--list");
  return sdkManagerResult
    .split("Available Packages")[0]
    .trim()
    .split("\n")
    .filter(line => line.includes("system-images"))
    .map(line => {
      return line
        .split("|")[0]
        .trim();
    });
}

function installSystemImage(): void {
  if (isArm64()) {
    sdkManager(`--install "${systemImageWithArch("arm64-v8a")}"`);
    return;
  }

  sdkManager(`--install "${systemImageWithArch("x86")}"`);
}

function createDevice(): void {
  const createDeviceCommand = (arch: AndroidCpuArchitecture): string => `--verbose create avd --force --name "${androidVirtualDeviceDeviceName}" --package "${systemImageWithArch(arch)}" --tag "google_apis" --device "pixel_c" --abi "${arch}"`;

  if (isArm64()) {
    avdManager(createDeviceCommand("arm64-v8a"));
    return;
  }

  avdManager(createDeviceCommand("x86"));
}

const systemImageWithArch = (arch: AndroidCpuArchitecture): string => `system-images;android-32;google_apis;${arch}`;

createAndroidVirtualDevice();
