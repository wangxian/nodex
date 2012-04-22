var log = require('./log');
  logWithoutFile = log.create();
  //logWithFile = log.create(log.WARNING, 'my.log');
 
logWithoutFile.info('info msg');
logWithoutFile.debug('debug msg');
logWithoutFile.warning('warning msg');
logWithoutFile.error('error msg');
logWithoutFile.trace('trace msg');
 
 
// logWithFile.info('info msg');
// logWithFile.debug('debug msg');
// logWithFile.warning('warning msg');
// logWithFile.error('error msg');
// logWithFile.trace('trace msg');