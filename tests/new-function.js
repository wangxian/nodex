
// 把对象绑定到函数
// var f = function(obj){
    // //obj.apply(this);
    // for(k in obj){
        // this[k] = obj[k];
    // }
    // this.func = function(){
        // return 123;  
    // };
// };
// console.log(new f({name:"wangxian"}));

// use not eval
// ff = new Function('var name=12; if(1) console.log(1);else console.log(2); return 18;');
// console.log(ff());

// use two arguments
fff = new Function('it,filter','zh', 'console.log(it,filter,zh); console.log(arguments)');
fff(1,2,3);


