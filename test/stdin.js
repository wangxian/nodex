
// 这一句是必须的
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write("please input your name:");

var str = '';
process.stdin.on('data', function (chunk) {
    process.stdout.write("your input:"+ chunk);
    
    process.stdout.write("wangxian@wx:");
    //process.exit(0);
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});