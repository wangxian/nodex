
var tmpl = {};
tmpl.render = function(){
    this.body = '<p></p>';  
};

tmpl.render.prototype = {
    'escapse': '&lt',
    'parse': function(){
        return this.body+'<h1>test</h1>';  
    },
};

t = new tmpl.render();
console.log(t);
console.log(t.body);
console.log(t.escapse);
console.log(t.parse());

