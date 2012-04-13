
var config = require('./config.js').config,
       app = require('./nodex.js');

app.configure(config).run();