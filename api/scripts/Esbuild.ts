import * as fs from "fs";
import * as path from "path";
import * as nodeModule from "node:module";
import {build} from "esbuild";

fs.rmSync(path.join(__dirname, "../build"), {
  force: true,
  recursive: true
});

executeEsbuild({
  entryPoint: path.join(__dirname, "../src/Main.ts"),
  outFile: path.join(__dirname, "../dist/src/Main.js")
}).catch(() => process.exit(1));

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
