import FastGlob from "fast-glob";
import * as Path from "node:path";
import {promises as FsPromises} from "node:fs";

function posixifyPath (s: string) {
   if (Path.sep == "/") {
      return s; }
   return s.replaceAll(Path.sep, "/"); }

export function isDynamicPattern (s: string) : boolean {
   const s2 = posixifyPath(s);
   return FastGlob.isDynamicPattern(s2); }

async function isDirectory (path: string) : Promise<boolean> {
   try {
      const stats = await FsPromises.stat(path);
      return stats.isDirectory(); }
    catch (_e) {
      return false; }}

async function fixUpSearchPath (s0: string) {
   let s = posixifyPath(s0);
   if (!FastGlob.isDynamicPattern(s)) {
      if (s.endsWith("/")) {
         s += "**"; }
       else if (await isDirectory(s)) {
         s += "/**"; }}
   return s; }

export async function getFileNames (baseDir: string, includes: string[], excludes: string[], excludeFileSize: number) : Promise<string[]> {
   const includes2 = await Promise.all(includes.map((e) => fixUpSearchPath(e)));
   const excludes2 = await Promise.all(excludes.map((e) => fixUpSearchPath(e)));
   const isWin = process.platform == "win32";
   const caseSensitiveMatch = !isWin;
   const options = {
      cwd: baseDir,
      ignore: excludes2,
      caseSensitiveMatch,
      followSymbolicLinks: false,
      dot: true,
      stats: excludeFileSize > 0 };
   const entries = await FastGlob(includes2, options);
   let fileNames: string[];
   if (excludeFileSize > 0) {
      fileNames = (<any>entries).flatMap((e: any) => (e.stats.size < excludeFileSize) ? e.path : []); }
    else {
      fileNames = entries; }
   return fileNames; }
