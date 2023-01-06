# NodeZip

A Node.js-based command line tool for creating ZIP files.

## Usage

```Shell
node nodezip.mjs "zipFileName"
   [-c "baseDir"] [-p "prefix"] "inclPath" [...] [-x "exclPath" ...]
   [-c ...]
```

zipFileName
: Output ZIP file name.

baseDir
: Base directory for subsequent "inclPath" and "exclPath".

prefix
: Output directory prefix path for within ZIP file.

inclPath
: [Glob pattern](https://github.com/mrmlnc/fast-glob#pattern-syntax) for files to include.

exclPath
: [Glob pattern](https://github.com/mrmlnc/fast-glob#pattern-syntax) for files to exclude and for directories to ignore.

## Examples

```Shell
node nodezip.mjs backup.zip "**/*.ts" "doc"
```

```Shell
node nodezip.mjs backup.zip "**" -x "**/node_modules" "**/dist"
```

Under Windows, quotes can be omitted and backslashes can be used in paths.
