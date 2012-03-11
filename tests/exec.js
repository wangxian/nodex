
require('child_process').exec('ls -la', function(err,stdout,stdin){
    console.log(stdout);
    
});
