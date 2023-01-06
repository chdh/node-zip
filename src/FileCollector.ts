import FastGlob from "fast-glob";
import * as Path from "path";
import {promises as FsPromises} from "fs";

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
    catch (e) {
      return false; }}

async function fixUpSearchPath (s0: string) {
   let s = posixifyPath(s0);
   if (!FastGlob.isDynamicPattern(s)) {
      if (s.endsWith("/")) {
         s += "**"; }
       else if (await isDirectory(s)) {
         s += "/**"; }}
   return s; }

export async function getFileNames (baseDir: string, includes: string[], excludes: string[]) : Promise<string[]> {
   const includes2 = await Promise.all(includes.map((e) => fixUpSearchPath(e)));
   const excludes2 = await Promise.all(excludes.map((e) => fixUpSearchPath(e)));
   const isWin = process.platform == "win32";
   const caseSensitiveMatch = !isWin;
   const options = {
      cwd: baseDir,
      ignore: excludes2,
      caseSensitiveMatch,
      followSymbolicLinks: false,
      dot: true };
   const list = await FastGlob(includes2, options);
   // if (Path.sep != "/") {
   //    for (let s of list) {
   //       s = s.replaceAll("/", Path.sep); }}
   return list; }
