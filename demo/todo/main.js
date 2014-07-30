/**
 * demo todo list
 * @copyright wangxian
 */
// app root dir
var app = require('nodex');
var config = require('./app/conf/default').config;
app.set(config);
app.run();

// console.dir(config);



/*---+ More process (server cpu count), and utomatically restart +---*
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) { cluster.fork(); }

  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died. restart...');
    cluster.fork();
  });
} else {
  // Worker processes have a http server.
  app.configure(config).run();
  console.log('This process is pid ' + process.pid);
}
/*---+ More process (server cpu count), and utomatically restart +---*/

