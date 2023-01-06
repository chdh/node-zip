import {ZipFile} from "yazl";
import * as Fs from "node:fs";
import {EventEmitter} from "node:events";

type ZipFileExt = ZipFile & EventEmitter;                  // necessary because Yazl type defs are incomplete

export function zip (outputFileName: string, inputFileNames: string[][]) : Promise<void> {
   let aborted = false;
   return new Promise<void>(executor);
   function executor (resolve: Function, reject: Function) {
      const zipFile = <ZipFileExt>new ZipFile();
      for (const f of inputFileNames) {
         zipFile.addFile(f[0], f[1]); }
      zipFile.end();
      const outputFileStream = Fs.createWriteStream(outputFileName);
      zipFile.outputStream.pipe(outputFileStream);
      // Events:
      outputFileStream.on("close", () => void resolve());
      zipFile.on("error", abort);
      zipFile.outputStream.on("error", abort);
      outputFileStream.on("error", abort);
      function abort (err: Error) {
         if (aborted) {
            return; }
         aborted = true;
         reject(err);
         (<any>zipFile).allDone = true;
         if (outputFileStream) {
            outputFileStream.destroy(); }}}}
