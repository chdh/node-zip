import * as FileCollector from "./FileCollector.ts";

export interface ZipSpecGroup {
   baseDir:                  string;
   prefix:                   string;                       // output directory prefix (for within ZIP file)
   includes:                 string[];
   excludes:                 string[];
   excludeFileSize:          number; }                     // exclude files equal or larger than this

export var zipFileName:      string;
export var zipSpec:          ZipSpecGroup[];

function isFileName (s: string) : boolean {
   return !!s && s[0] != "-" && !FileCollector.isDynamicPattern(s); }

function parseZipFileSpec (args: string[]) {
   zipSpec = [];
   let baseDir = "";
   let prefix = "";
   let includes: string[] = [];
   let excludes: string[] = [];
   let inclExcl = true;
   let excludeFileSize = 0;
   let argp = 0;
   while (argp < args.length) {
      const arg = args[argp++];
      if (arg[0] == "-") {
         switch (arg) {
            case "-c": {                                   // change base directory
               flushZipSpecGroup();
               if (argp >= args.length) {
                  throw new Error("Missing argument for -c option."); }
               baseDir = args[argp++];
               if (!isFileName(baseDir)) {
                  throw new Error(`Invalid base directory specification: "${baseDir}".`); }
               prefix = "";
               inclExcl = true;
               break; }
            case "-p": {                                   // prefix for ZIP path
               flushZipSpecGroup();
               if (argp >= args.length) {
                  throw new Error("Missing argument for -p option."); }
               prefix = args[argp++];
               if (!isFileName(prefix)) {
                  throw new Error(`Invalid prefix path specification: "${prefix}".`); }
               inclExcl = true;
               break; }
            case "-xSize": {                               // exclude files equal or larger than specified size
               flushZipSpecGroup();
               if (argp >= args.length) {
                  throw new Error("Missing argument for -xSize option."); }
               excludeFileSize = Number(args[argp++]);
               break; }
            case "-x": {                                   // exclude paths (paths following on command line)
               inclExcl = false;
               break; }
            default: {
              throw new Error(`Unknown command line option "${arg}".`); }}
         continue; }
      if (inclExcl) {
         includes.push(arg); }
       else {
         excludes.push(arg); }}
   flushZipSpecGroup();

   function flushZipSpecGroup() {
      if (includes.length == 0) {
         return; }
      zipSpec.push({baseDir, prefix, includes, excludes, excludeFileSize});
      includes = [];
      excludes = []; }}

function displayHelp() {
   process.stdout.write(
      "Syntax: nodezip zipFileName [-c baseDir] [-p prefix] [-xSize excludeFileSize] inclPath [...] [-x exclPath ...] [-c ...]\n"); }

export function init() {
   const args = process.argv.slice(2);
   if (args.length == 0) {
      displayHelp();
      process.exit(1); }
   zipFileName = args[0];
   if (!isFileName(zipFileName)) {
      throw new Error(`Invalid ZIP file name "${zipFileName}".`); }
   parseZipFileSpec(args.slice(1));
   if (!zipSpec.length) {
      throw new Error("No input files specified."); }}
