# NodeZip

A Node.js-based command line tool for creating ZIP files.

## Usage

```Shell
node nodezip.mjs "zipFileName"
   [-c "baseDir"] [-p "prefix"] "inclPath" [...] [-x "exclPath" ...]
   [-c ...]
```

<dl>

<dt>zipFileName
<dd>Output ZIP file name.

<dt>baseDir
<dd>Base directory for subsequent <i>"inclPath"</i> and <i>"exclPath"</i>.

<dt>prefix
<dd>Output directory prefix path for the files within the ZIP file.

<dt>inclPath
<dd><a href="https://github.com/mrmlnc/fast-glob#pattern-syntax">Glob pattern</a> for files to include.

<dt>exclPath
<dd><a href="https://github.com/mrmlnc/fast-glob#pattern-syntax">Glob pattern</a> for files to exclude and for directories to ignore.

</dl>


## Examples

```Shell
node nodezip.mjs backup.zip "**/*.ts" "doc"
```

```Shell
node nodezip.mjs backup.zip "**" -x "**/node_modules" "**/dist"
```

Under Windows, quotes can be omitted and backslashes can be used in paths.
