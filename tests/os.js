
os = require('os');

console.log('hostname:',os.hostname());

console.log("type",os.type());

console.log("release",os.release());

console.log("uptime",os.uptime());

console.log("loadavg",os.loadavg());


console.log("totalmem",os.totalmem());

console.log("freemem",os.freemem());

console.log("cpus:", os.cpus());
