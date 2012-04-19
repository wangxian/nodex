
/**
 * 测试 new function \ json function parse
 */
var o = {a:1,b:2,c:3,d:4,e:5,f:6};

var start_time = new Date().getTime();
for(i=0;i<1000000;i++){
    t = 'var ';
    for(k in o){
        t+=k+'='+o[k]+',';
    }
    t = t.slice(0,-1) + ';return a;';
    f = new Function('', t);
    f();
};
console.log(new Date().getTime() - start_time);

// var start_time = new Date().getTime();
// for(i=0;i<1000000;i++){
    // t = 'with(o){ return a;  }';
    // f = new Function('o', t);
    // f(o);
// };
// console.log(new Date().getTime() - start_time);

// var f = function(){
    // with(o){ console.log(c); };
// };

// f = new Function('o','console.log(o);');
// f(JSON.stringify(o));
