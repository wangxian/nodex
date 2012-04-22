var log = function(o){ console.log(o); };

log( process.getuid() );
log( process.env );

console.log('Prefix: ' + process.installPrefix);

console.log('This process is pid ' + process.pid);
console.log('This platform is ' + process.platform);

var util = require('util');

console.log(util.inspect(process.memoryUsage()));

console.log('Version: ' + process.version);

console.log( process.argv );

// print process.argv
process.argv.forEach(function (val, index) {
  console.log(index + ': ' + val);
});


console.log(process.title);