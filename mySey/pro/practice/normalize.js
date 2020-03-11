const path = require('path')
// const normalize = require('path').normalize 等同
const mod = require('./cosmod')

console.log(mod.testVar);
console.log('_dirname', __dirname);
console.log('process.cwd()', process.cwd());
console.log('./', path.resolve('./'))

