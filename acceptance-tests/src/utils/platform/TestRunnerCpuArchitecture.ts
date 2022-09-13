import {arch} from "os";

export const isArm64 = (): boolean => arch() === "arm64";
