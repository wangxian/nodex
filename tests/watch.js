
// has bug on osx 10.7.3

require('fs').watch('/Users/wangxian/Sites/nodejs/', function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
      console.log('filename provided: ' + filename);
  } else {
      console.log('filename not provided');
  }
});