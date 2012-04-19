//output_me.js
var fs = require('fs'), fileContent = 'nothing';
fileContent = fs.readFileSync(__filename, "utf-8"); // utf-8 same as utf8

console.log(fileContent);