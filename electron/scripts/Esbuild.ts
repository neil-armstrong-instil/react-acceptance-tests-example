import * as fs from "fs";
import * as path from "path";
import * as nodeModule from "node:module";
import {build} from "esbuild";

fs.rmSync(path.join(__dirname, "../build"), {
  force: true,
  recursive: true
});

Promise.all([
  executeEsbuild({
    entryPoint: path.join(__dirname, "../src/ElectronEntryPoint.ts"),
    outFile: path.join(__dirname, "../build/src/ElectronEntryPoint.js")
  }),
  executeEsbuild({
    entryPoint: path.join(__dirname, "../src/rt/electron-plugins.js"),
    outFile: path.join(__dirname, "../build/src/rt/electron-plugins.js")
  }),
  executeEsbuild({
    entryPoint: path.join(__dirname, "../src/setup/Preload.ts"),
    outFile: path.join(__dirname, "../build/src/setup/Preload.js")
  })
]).catch(() => process.exit(1));

interface BuildConfiguration {
  entryPoint: string;
  outFile: string;
}

async function executeEsbuild({entryPoint, outFile}: BuildConfiguration): Promise<void> {
  console.log(`Executing esbuild from input '${entryPoint}' to '${outFile}'`);

  await build({
    entryPoints: [entryPoint],
    outfile: outFile,
    bundle: true,
    platform: "node",
    external: [
      "electron",
      ...nodeModule.builtinModules
    ],
    loader: {
      ".node": "copy"
    }
  });
}
