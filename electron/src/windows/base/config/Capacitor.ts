// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getCapacitorElectronConfig} from "@capacitor-community/electron";

export const capacitorElectronConfig = getCapacitorElectronConfig();
export const urlScheme = capacitorElectronConfig.electron?.customUrlScheme ?? "capacitor-electron";
