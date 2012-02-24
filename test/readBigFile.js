var fs = require('fs');

t = fs.createReadStream('./mime.js');
var data = '';
t.on('data',function(chunk){
    data += chunk;
}).on('end',function(){
    console.log(data);
    console.log("file end...."); 
});
