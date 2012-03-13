
view = {
    'render': function(filename,args){
        if(! filename){
            filename = __dirname+'/app/views/'+app.get.controller+'/'+app.get.action+'.html';
        }else{
            if(filename.lastIndexOf('.html')==-1) filename+='.html';
            filename = __dirname+'/app/views/'+filename; 
        }
        
        var fn = this._cache[ utils.md5(filename) ];
        if(typeof fn == 'undefined'){
            var it = this;
            fs.readFile(filename,'utf8',function(err,ctx){
                if(err) app.res.end(err.message);
                fn = it.compile(ctx);
                //it._cache[ utils.md5(filename) ] = fn;
                app.res.end(fn(args));
            });  
        }else{
            app.res.end(fn(args));
        }
    },
    'compile': function(ctx){
        var code = "var out='"+ ctx.replace(/'/g,"\\'").replace(/\n/g,"'+\"\\n\"+'").replace(/\s*\{\{(=?)(.+?)\}\}/g,function(txt,a,b){
            return a=='='?"'+it."+ b +"+'":"';"+ b +"out+='";
        }) +"';return out;";
        //.replace(/\n/g,"'+\"\\n\"+'")
        
        console.log(code);
        return new Function();
        // return new Function('it',code); 
    },
    '_cache': {}
}