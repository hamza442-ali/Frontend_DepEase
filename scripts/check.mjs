import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { parse } from '@babel/parser';

const root = process.cwd();
const issues = [];
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? filesIn(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
const files = (await filesIn(path.join(root, 'src'))).filter((file) =>
  /\.[cm]?[jt]sx?$/.test(file),
);
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const label = path.relative(root, file);
  let ast;
  try {
    ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
  } catch (error) {
    issues.push(`${label}: ${error.message}`);
    continue;
  }
  const imports = ast.program.body
    .filter(
      (node) =>
        ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(
          node.type,
        ) && node.source,
    )
    .map((node) => node.source.value);
  for (const specifier of imports.filter((value) => value.startsWith('.'))) {
    const resolved = path.resolve(path.dirname(file), specifier);
    const candidates = [
      resolved,
      ...['.js', '.jsx', '.json', '.css'].map((extension) => resolved + extension),
      path.join(resolved, 'index.js'),
      path.join(resolved, 'index.jsx'),
    ];
    const target = (await Promise.all(candidates.map(exists))).findIndex(Boolean);
    if (target < 0) {
      issues.push(`${label}: missing import ${specifier}`);
      continue;
    }
    const relative = path.relative(root, candidates[target]);
    let directory = root;
    for (const segment of relative.split(path.sep)) {
      if (!(await readdir(directory)).includes(segment)) {
        issues.push(`${label}: import casing does not match ${specifier}`);
        break;
      }
      directory = path.join(directory, segment);
    }
  }
  if (/localhost:\d/.test(source) && !file.endsWith(path.join('lib', 'api.js')))
    issues.push(`${label}: keep API origins in the shared client`);
  if (/console\.(log|debug)\(/.test(source)) issues.push(`${label}: remove debug logging`);
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else console.log(`Checked syntax and relative imports in ${files.length} source files.`);
