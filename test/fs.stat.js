var fs = require('fs');

fs.stat('/etc/passwd', function(error,file){
    console.log(error,file);
});
