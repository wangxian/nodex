
var fs = require('fs');


try{
    fileContent = fs.readFileSync('t.js', "utf-8"); // utf-8 same as utf8
}
catch(e){
    console.log(e.code);
    console.log(e.errno);
    console.log(e.message);
    console.log(e.stack);
}
