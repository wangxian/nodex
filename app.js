/*!
 * NodeX Server
 * Project start: 2012.3.12
 * Copyright(c) 2010 WangXian <xian366@gmail.com>
 * MIT Licensed
 */

var config = require('./config.js').config,
       app = require('./nodex.js');

/*-------------------+ One process(For dev) -------------------+*/
app.configure(config).run();
/*-------------------+ One process(For dev) -------------------+*/



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

