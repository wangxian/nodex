
view = {
    render: function(ctx,args){
        var code = 'var ';
        for(key in args) { code += key+ '='+ args[key] +','; }
        code += code.slice(0,-1)+';';
        
        code += "var out='"+ ctx.replace(/'/g,"\\'").replace(/\{\{(=?)(.+?)\}\}/g,function(txt,a,b){
            return a=='='?"'+"+ b +"+'":"';"+ b +"out+='";
        }) +"';return out;";
        
        
        return code;
    }
}
out = view.render('Hello {{=name}} <div id="wrapper" class=\'lt\'>{{ if(1>2){  }}<h1>null</h1>{{ }else{ }}<h1>{{=name}}</h1> {{ } }} <p>pppoe</p>', {name: 'nodex'});
console.log(out);
process.exit();

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
    fs = require('fs');
    url = require('url'),
    zlib = require('zlib'),
    querystring = require('querystring');

http.createServer(function(req, res){
	res.setHeader('Server', 'nodex/0.1');
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




