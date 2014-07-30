/**
 * demo todo list
 * @copyright wangxian
 */
var config = require('./app/conf/default').config;
var app = require('nodex');
app.configure(config).run();



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

