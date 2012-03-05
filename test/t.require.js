/**
 * 测试外部对象和 require
 * 
 * 沙箱内运行
 */

app = {id: 18};

// r = require('./t.require2');
// r.test();
// var controller = function(){
    // //console.log(app);
// }
// ct = new controller();
//r.test.apply(ct);
require('./t.require2').inner();


