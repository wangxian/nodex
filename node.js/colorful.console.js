
// require('util').format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
// require('util').debug('\x1B[', 'message on stderr');
// require('util').log('Timestamped message.');

// var t = [ '2012-04-09 18:28:32',
  // ' [',
  // '\u001b[',
  // '33m',
  // 'INFO',
  // '\u001b[0m',
  // '] [',
  // '\u001b[',
  // '36m',
  // 'tests/log.test.js:5',
  // '\u001b[0m',
  // '] ',
  // 'info msg' ];
// console.log(t.join(''));
// console.log('\u001b[38m [INFO] \u001b[0m ');
// console.log('\u001b[34m [INFO] \u001b[0m ');
// console.log('\u001b[35m [INFO] \u001b[0m ');
// console.log('\u001b[31m [INFO] \u001b[0m ');
// console.log('\u001b[32m [INFO] \u001b[0m ');
// console.log('\u001b[36m [INFO] \u001b[0m ');
// console.log('\u001b[33m [INFO] \u001b[0m ');

for(var i=31;i<=36;i++){
  console.log('\u001b['+ i +'m'+ (i*102312) +'\u001b[0m');
}
color = {'red':'31',
         'green':'32',
         'yellow':'33',
         'blue':'34',
         'pink':'35',
         'cyan':'36'
        }

// console.log('\u001b[31m [INFO] \u001b[0m ');
// console.log('\u001b[32m [INFO] \u001b[0m ');
// console.log('\u001b[33m [INFO] \u001b[0m ');
// console.log('\u001b[34m [INFO] \u001b[0m ');
// console.log('\u001b[35m [INFO] \u001b[0m ');
// console.log('\u001b[36m [INFO] \u001b[0m ');