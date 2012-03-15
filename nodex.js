
var port = 8888;
var assets_dir = 'assets';

app = {
    'extend': function(parent, child){
        var parent = require('./_app/controllers/'+ parent)['controller'];
        for(i in parent){ if( typeof(child[i]) == "undefined") { child[i] = parent[i]; } }
        return child;
    },
    'dump': function(variables){ this.res.write( '<pre>'+ require('util').inspect(variables) + '</pre>' ); this.res.end(); },
    'redirect': function(url){ this.res.writeHeader(301, {"Location": url}); this.res.end(); }
};
var http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    url  = require('url'),
    zlib = require('zlib'),
    querystring = require('querystring');

http.createServer(function(req, res){
	res.setHeader('Server', 'nodex/0.2');
	res.setHeader('X-Powered-By', 'node.js');
	console.log(new Date() + ' - ' + req.url);
	
	if(req.url=='/favicon.ico' || req.url.slice(1,7)=='assets'){
	    var filename = __dirname + req.url.replace(/\.\./g,'');
	    fs.stat(filename, function(error, stat){
	       if(error) { 
	           res.writeHead(500, {'content-type': 'text/plain'});
	           res.end('404 File Not Found.');
           }else{
               var lastModified = stat.mtime.toUTCString();
               res.setHeader("Last-Modified", lastModified);
               if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
                    res.writeHead(304, "Not Modified");
                    res.end();
                }else{
                    res.setHeader('Content-Type', contentTypes[ filename.slice(filename.lastIndexOf('.')+1) ] || 'text/plain');
                    
                    if(/\.(gif|png|jpg|js|css)$/i.test(filename)){
                        var expires = new Date();
                        expires.setTime( expires.getTime() + (86400000 * 15) );
                        res.setHeader("Expires",  expires.toUTCString());
                        res.setHeader("Cache-Control", "max-age="+ (86400 * 15));
                    }
                    
                    var raw = fs.createReadStream(filename);
                    var acceptEncoding = req.headers['accept-encoding'] || '';
                    var matched = /\.(html|js|css)$/i.test(filename);
                    if(matched && /\bgzip\b/.test(acceptEncoding)){
                        res.writeHead(200, {'Content-Encoding': 'gzip'});
                        raw.pipe(zlib.createGzip()).pipe(res);
                    }else if(matched && /\bdeflate\b/.test(acceptEncoding)){
                        res.writeHead(200, {'Content-Encoding': 'deflate'});
                        raw.pipe(zlib.createDeflate()).pipe(res);
                    }else{
                        res.writeHead(200);
                        raw.pipe(res);
                    }
                }
           }
	    });
	}else{
	    var _postData = '';
    	req.on('data', function(chunk){
    		_postData += chunk;
    	}).on('end', function(){
    		app.post = querystring.parse(_postData);
    		var rx = url.parse(req.url, true);
    		var controller_action = rx.pathname.slice(1).split('/');
    		
    		app.get = rx.query;
    		app.get['controller'] = controller_action[0] ? controller_action.shift() : 'index';
    		app.get['action'] = controller_action[0] ? controller_action.shift() : 'index';
    		app.get['querypath'] = controller_action;
    		app.req = req;
    		app.res = res;
    		
    		try{
        		controllers = require('./app/controllers/'+ app.get.controller)['controller'];
        		if( typeof(controllers['__construct']) == "function" ) controllers['__construct']();
        		controllers[ app.get.action ]();
    		}
    		catch(e){
    		    //TODO: production: 404 dev: 500
    		    res.end("Error:" + e.message);
    		    console.log(e.stack);
    		    return 0;
    		}
	   });
    }

}).listen(port);
console.log('Server running at port http://hostname:' + port);


var contentTypes = {
    "avi": "video/x-msvideo","rar": "application/x-rar-compressed",
    "css": "text/css", "deb": "application/x-debian-package","doc": "application/msword",
    "flv": "video/x-flv", "gif": "image/gif","gz": "application/x-gzip", "html": "text/html", 
    "jar": "application/java-archive", "jpeg": "image/jpeg", "jpg": "image/jpeg", 
    "js": "text/javascript", "json": "application/json",'ico': 'image/x-icon',"midi": "audio/midi","mime": "www/mime", 
    "mp4": "video/mp4", "pdf": "application/pdf","png": "image/png", "rtf": "text/rtf", "swf": "application/x-shockwave-flash",
    "tar": "application/x-tar", "tgz": "application/x-tar-gz", "txt": "text/plain",
    "wav": "audio/x-wav", "wma": "audio/x-ms-wma","wmv": "video/x-ms-wmv", "xml": "text/xml",
    "zip": "application/zip", "undefined": "application/octet-stream"
};

utils = {
    'md5': function(ctx){ return require('crypto').createHash('md5').update(ctx).digest('hex'); },
    'escapehtml': function( str ){ return str.replace(/[<>]/g,function(m){ return m=='>'?'&gt':'&lt' }); }
}

view = {
    'render': function(filename,args){
        app.res.end(view._render(filename,args,false));
    },
    'partial': function(filename, args){
        return view._render(filename,args,true);
    },
    'header': function(filename, args){
        return view._render(filename,args,false);
    },
    '_cache': {},
    '_render': function(filename,args,forceFile){
        args= args||{}; args.partial=this.partial;args.header=this.header;
        if(! filename){
            filename = __dirname+'/app/views/'+app.get.controller+'/'+app.get.action+'.html';
        }else{
            if(filename.lastIndexOf('.html')==-1) filename+='.html';
            filename = __dirname+'/app/views/'+filename; 
        }
        if(path.existsSync(filename)){
            var ctx = fs.readFileSync(filename,'utf-8');
            return this._compile(ctx)(args);
        }
        else if(forceFile){ app.res.end('Error:'+ filename+ ' not exists.'); }
        else { return ''; }
    },
    '_compile': function(ctx){
        var code = "var out='"+ ctx.replace(/\('(.*)'\)/g,'("$1")').
            replace(/'/g,"\\'").
            replace(/\{\{(.+?)\}\}/g,"'+it.$1+'").
            replace(/\s*<%(.+?)%>/g, "';$1 out+='").
            replace(/\n/g,"'+\"\\n\"+'") +"';return out;";        
        //console.log(code);return new Function();
        return new Function('it',code);
    }
}



