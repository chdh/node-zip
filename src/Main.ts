import * as Path from "node:path";
import * as CmdLine from "./CmdLine.js";
import * as FileCollector from "./FileCollector.js";
import * as Zipper from "./Zipper.js";

async function getFileSpec (zipSpec: CmdLine.ZipSpecGroup[]) : Promise<string[][]> {
   const fileSpec: string[][] = [];
   for (const g of zipSpec) {
      const list = await FileCollector.getFileNames(g.baseDir, g.includes, g.excludes);
      for (const f of list) {
         const diskFileName = Path.posix.join(g.baseDir, f);
         const zipFileName = Path.posix.join(g.prefix, f);
         fileSpec.push([diskFileName, zipFileName]); }}
   return fileSpec; }

async function main2() {
   CmdLine.init();
   const fileSpec = await getFileSpec(CmdLine.zipSpec);
   await Zipper.zip(CmdLine.zipFileName, fileSpec); }

async function main() {
   try {
      await main2(); }
    catch (e) {
      console.log(e);
      process.exit(99); }
   process.exit(0); }

void main();
