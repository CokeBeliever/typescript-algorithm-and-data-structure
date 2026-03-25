const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'dist');
const esmBuildRoot = path.join(projectRoot, '.build', 'esm');
const legacyEsmRoot = path.join(distRoot, 'esm');

function removeDirectory(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function ensureDirectory(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function resolveEsmTarget(target) {
  const directFile = path.join(esmBuildRoot, `${target}.js`);
  if (fs.existsSync(directFile)) {
    return path.join(distRoot, `${target}.mjs`);
  }

  const indexFile = path.join(esmBuildRoot, target, 'index.js');
  if (fs.existsSync(indexFile)) {
    return path.join(distRoot, target, 'index.mjs');
  }

  return path.join(distRoot, `${target}.mjs`);
}

function rewriteAliases(content, fileDir, isEsmOutput) {
  return content.replace(/(["'])@\/([^"']+)\1/g, (_, quote, target) => {
    const absoluteTarget = isEsmOutput
      ? resolveEsmTarget(target)
      : path.join(distRoot, target);
    let relativeTarget = path.relative(fileDir, absoluteTarget).replace(/\\/g, '/');

    if (!relativeTarget.startsWith('.')) {
      relativeTarget = './' + relativeTarget;
    }

    return quote + relativeTarget + quote;
  });
}

function rewriteAndCopyEsmFile(sourcePath) {
  const relativePath = path.relative(esmBuildRoot, sourcePath);
  const targetRelativePath = relativePath.replace(/\.js$/, '.mjs');
  const targetPath = path.join(distRoot, targetRelativePath);
  const targetDir = path.dirname(targetPath);
  const content = fs.readFileSync(sourcePath, 'utf8');
  const rewritten = rewriteAliases(content, targetDir, true);

  ensureDirectory(targetDir);
  fs.writeFileSync(targetPath, rewritten, 'utf8');
}

function copyAndRewriteEsmDirectory(currentDir) {
  if (!fs.existsSync(currentDir)) {
    return;
  }

  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const entryPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      copyAndRewriteEsmDirectory(entryPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.js')) {
      rewriteAndCopyEsmFile(entryPath);
    }
  }
}

function rewriteDistDeclarationsAndCjs(currentDir) {
  if (!fs.existsSync(currentDir)) {
    return;
  }

  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const entryPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      rewriteDistDeclarationsAndCjs(entryPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!(entry.name.endsWith('.js') || entry.name.endsWith('.d.ts'))) {
      continue;
    }

    if (entry.name.endsWith('.mjs')) {
      continue;
    }

    const content = fs.readFileSync(entryPath, 'utf8');
    const rewritten = rewriteAliases(content, path.dirname(entryPath), false);

    if (rewritten !== content) {
      fs.writeFileSync(entryPath, rewritten, 'utf8');
    }
  }
}

removeDirectory(legacyEsmRoot);
copyAndRewriteEsmDirectory(esmBuildRoot);
rewriteDistDeclarationsAndCjs(distRoot);
removeDirectory(esmBuildRoot);
removeDirectory(path.join(projectRoot, '.build'));
