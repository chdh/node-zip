const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const builtinModules = require("builtin-modules");

module.exports = {
   input: "tempBuild/Main.js",
   output: {
      file: "nodezip.mjs",
      format: "es",
      banner: "#!/usr/bin/env node" },
   external: [
      ...builtinModules ],
   plugins: [
      nodeResolve(),
      commonjs() ]};
