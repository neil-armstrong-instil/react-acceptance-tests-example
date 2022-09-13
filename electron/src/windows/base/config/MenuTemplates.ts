import type {MenuItemConstructorOptions} from "electron";
import {MenuItem} from "electron";

type MenuTemplate = MenuItem | MenuItemConstructorOptions;

export const trayMenuTemplate: MenuTemplate[] = [
  new MenuItem({
    label: "Quit App",
    role: "quit"
  })
];

export const appMenuBarMenuTemplate: MenuTemplate[] = [
  {role: process.platform === "darwin" ? "appMenu" : "fileMenu"},
  {role: "viewMenu"}
];
