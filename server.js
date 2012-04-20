/*!
 * NodeX Server
 * Project start: 2012.3.12
 * Copyright(c) 2010 WangXian <xian366@gmail.com>
 * MIT Licensed
 */

var config = require('./config.js').config,
       app = require('./nodex.js');

app.configure(config).run();