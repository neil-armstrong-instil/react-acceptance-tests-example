import {app, nativeImage} from "electron";
import path from "path";

export const icon = nativeImage.createFromPath(
  path.join(
    app.getAppPath(),
    "assets",
    process.platform === "win32" ? "appIcon.ico" : "appIcon.png"
  )
);
