
var port = 8888;
var assets_dir = 'assets';

app = {
    'extend': function(parent_name, child){
        var parent = require('./_app/controllers/'+ parent_name)[parent_name];
        for(i in parent){ if( typeof(child[i]) == "undefined") { child[i] = parent[i]; } }
        return child;
    },
    'dump': function(variables){ this.res.write( '<pre>'+ require('util').inspect(variables) + '</pre>' ); this.res.end(); },
    'redirect': function(url){ this.res.writeHeader(301, {"Location": url}); this.res.end(); }
};
var http = require('http'),
    path = require('path'),
    fs = require('fs');
    url = require('url'),
    zlib = require('zlib'),
    querystring = require('querystring');

http.createServer(function(req, res){
	res.setHeader('Server', 'nodex/0.1');
	res.setHeader('X-Powered-By', 'node.js');
	console.log('['+ new Date() +'] URL = ' + req.url);
	
	if(req.url.slice(1,7)=='assets'){
	    var filename = path.join(__dirname,req.url);
	    
	    var raw = fs.createReadStream(filename);
        var acceptEncoding = req.headers['accept-encoding'] || "";
        if (acceptEncoding.match(/\bgzip\b/)) {
            res.writeHead(200, "Ok", {
                'Content-Encoding': 'gzip'
            });
            raw.pipe(zlib.createGzip()).pipe(res);
        } else if (acceptEncoding.match(/\bdeflate\b/)) {
            res.writeHead(200, "Ok", {
                'Content-Encoding': 'deflate'
            });
            raw.pipe(zlib.createDeflate()).pipe(res);
        } else {
            res.writeHead(200, "Ok");
            raw.pipe(response);
        }
	    
	    /**
	    path.exists(filename, function(exists){
            if(exists){
                fs.readFile(filename,'binary', function(error,file){
                    if(error) {
                        res.writeHead(500, {'content-type': 'text/plain'})
                        res.end(error.message);
                    }else{
                        var expires = new Date();
                        expires.setTime( expires.getTime() + (86400000 * 15) );
                        res.setHeader("Expires",  expires.toUTCString());
                        res.setHeader("Cache-Control", "max-age="+ (86400 * 15));
                        fs.stat(filename, function (error, stat) {
                            var lastModified = stat.mtime.toUTCString();
                            if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
                                res.writeHead(304, "Not Modified");
                                res.end();
                            }else{
                                res.setHeader("Last-Modified", lastModified);
                                res.writeHead(200, {'content-type':  contentTypes[ path.extname(filename).slice(1) ] || 'text/plain' } );
                                res.end(file,'binary'); 
                            }
                        });  
                    }
                }) 
            }
            else{
                res.writeHead(404, {'content-type': 'text/plain'});
                res.end('File not Found!');
            }
        });
        /**/
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
        		controllers = require('./_app/controllers/'+ app.get.controller)[ app.get.controller ];
        		if( typeof(controllers['__construct']) == "function" ) controllers['__construct']();
        		controllers[ app.get.action ]();
    		}
    		catch(e){
    		    //TODO: production: 404 dev: 500
    		    res.end("Error:" + e.message);
    		    return 0;
    		}
	   });
    }

}).listen(port);
console.log('Server running at port '+ port);

var contentTypes = {
    "asf": "video/x-ms-asf", "avi": "video/x-msvideo","rar": "application/x-rar-compressed",
    "css": "text/css", "deb": "application/x-debian-package","doc": "application/msword",
    "flv": "video/x-flv", "gif": "image/gif","gz": "application/x-gzip", "html": "text/html", 
    "jar": "application/java-archive", "jpeg": "image/jpeg", "jpg": "image/jpeg", 
    "js": "text/javascript", "json": "application/json",
    "midi": "audio/midi","mime": "www/mime","mp4": "video/mp4",
    "pdf": "application/pdf","png": "image/png", "rtf": "text/rtf", "sh": "application/x-sh",
    "svg": "image/svg+xml", "swf": "application/x-shockwave-flash",
    "tar": "application/x-tar", "tgz": "application/x-tar-gz","tiff": "image/tiff", "txt": "text/plain",
    "wav": "audio/x-wav", "wma": "audio/x-ms-wma","wmv": "video/x-ms-wmv", "xml": "text/xml", "xpm": "image/x-xpixmap",
    "zip": "application/zip", "undefined": "application/octet-stream"
};




