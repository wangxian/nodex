/**
 * index page
 */

exports.index = app.extends('blog',{
    
    __construct: function(){
        console.log("index init...");
    },
    
    index: function(req,res){
        res.write( '<h1>hi,this is index page.</h1>' );
        res.dump( this );
        console.log(this);
        res.end();
    }
});
