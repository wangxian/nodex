

// 创建原型
app = {
    'extend': function(dest,source){
        for(i in dest){
            if(typeof(source[i]) == undefined) source[i] = dest[i];
        }
        return source;
    }
}

var obj = {
    f1: function(){
        console.log("I am dest object");  
    }
};

var t = app.extend({
    "name": "wx",
    "f1": function() {
        console.log("I am source object");
    },
    "f2": function(){ },
    "f3": function () { }
});



console.log(t);
t.f1();

