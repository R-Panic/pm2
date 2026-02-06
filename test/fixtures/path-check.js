console.log(__filename);
console.log(module.filename);
console.log(module.parent);
console.log(module.children);
console.log(__dirname);
// Output specific module properties instead of entire object (varies between Node versions)
console.log(JSON.stringify({
  id: module.id,
  path: module.path,
  filename: module.filename,
  loaded: module.loaded,
  paths: module.paths
}));
console.log(process.env.PWD);
console.log(require.main.filename);
console.log(require.main === module);
