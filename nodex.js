/*!
 * NodeX Server
 * Project start: 2012.3.12
 * Copyright(c) 2010 WangXian <xian366@gmail.com>
 * MIT Licensed
 */

/* application common object */
app = {
  'req':null, 'res':null, 'config':{}, '_postData': '',
  'end': function(data, encoding){ this.res.end(data, encoding); },
  'render': function(filename,args){ try{ return this.res.end(view.render(filename,args)); }catch(e){ console.log(e.stack); this.res.end(e.message);} },
  'cookie':{
    '_cookieGetData':'',
    '_cookieSetData':[],
    'get': function(name){
      if(this._cookieGetData == ''){
        if(! app.req.headers.cookie) return '';
        this._cookieGetData = {};
        var pairs = app.req.headers.cookie.split(";");
        for(var i=0;i<pairs.length;i++){
          var kv = pairs[i].split("=");
          if(kv[0]){ this._cookieGetData[kv[0]] = kv[1] || '' }
        }
      }
      return name ? (this._cookieGetData[name] || '') : this._cookieGetData;
    },
    'set': function(cookieObj){
      /* {'name':'','value':'', 'expires':1334112331, 'path':'/', 'domain':'', 'secure':false, 'httponly':false} */
      if(! cookieObj.name) throw new Error('In setCookie([object] cookieObj) ,cookieObj must has key "name"');
      var cookieString = cookieObj.name +'='+  encodeURI(cookieObj.value||'');
      
      if(typeof cookieObj.expires != 'undefined'){ var now=new Date(); now.setTime( now.getTime() + cookieObj.expires*1000 ); cookieString += '; expires='+ now.toUTCString(); }
      if(cookieObj.path){ cookieString += "; path="+ cookieObj.path; }
      if(cookieObj.domain){ cookieString += "; domain="+ cookieObj.domain; }
      if(cookieObj.secure){ cookieString += "; secure"; }
      if(cookieObj.httponly){ cookieString += "; httponly"; }
      
      this._cookieSetData[this._cookieSetData.length] = cookieString;
      app.res.setHeader('Set-Cookie', this._cookieSetData);
    }
  },
  'session':{
    '_start': false,
    'session_name':'NODEXID',
    'lifetime':1440,
    '_sessions':{},
    'session_id': function(){ return app.cookie.get(this.session_name); },
    '_init':function(){
      var session_id = this.session_id();
      if(session_id && _sessionData[session_id] ){
        if(_sessionData[session_id].updated + this.lifetime*1000 >= new Date().getTime()){
          _sessionData[session_id].updated = new Date().getTime(); return session_id;
        }
        else{ delete _sessionData[session_id]; }
      }
      session_id = (1e13*Math.round(Math.random() * 10000) + new Date().getTime()).toString(32);
      app.cookie.set({'name': this.session_name, 'value': session_id, 'path': '/', 'expires': 2592000}); 
      _sessionData[session_id] = {'updated':new Date().getTime(),'data':{}};
      return session_id;
    },
    'get':function(key){
      var session_id = this._init();
      if(_sessionData[session_id]){
        return key ? ( _sessionData[session_id]['data'][key] || ''): _sessionData[session_id]['data'];
      }
      else return '';
    },
    'gods': function(){ return _sessionData; },
    'set':function(key,value){ _sessionData[this._init()]['data'][key] = value; },
    'delete':function(key){ delete _sessionData[this._init()]['data'][key]; },
    'deleteAll': function(){ _sessionData[this._init()]['data']={}; }
  },
  'md5': function(ctx){ return require('crypto').createHash('md5').update(ctx).digest('hex'); },
  'beget':function(obj){ var F = function(){}; F.prototype = obj; return new F();},
  'extend': function(parent, child){
    var parent = require(__dirname+'/app/controllers/'+ parent)['controller'];
    var vchild = this.beget(parent); for(var A in child){ vchild[A] = child[A]; } return vchild;
  },
  'encodeHTML': function (A){return String(A).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},
  'decodeHTML': function (B){var A=String(B).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");return A.replace(/&#([\d]+);/g,function(C,D){return String.fromCharCode(parseInt(D,10))})},
  'redirect': function(url){ this.res.writeHeader(302, {"Location": url}); this.res.end(); }
};

/**
 * print some information
 * @param sting|buffer data
 * @param string encoding charset,utf8,gbk
 */
print = function(data, encoding){ app.res.write(data, encoding); };

/**
 * print object\string\boolean\number\null
 * @param array args...
 */
dump  = function(){ for(var i=0;i<arguments.length;i++){  app.res.write( '<pre>'+ require('util').inspect(arguments[i]) + '</pre>');  } };


/* nodex template */
view = {
  'render': function(filename,args){
    args = args || {};
    if(args['layout']===false) {
      return this._render(filename,args,false);
    }
    else{
      if(typeof args['layout'] == "undefined") args['layout']='layout.html';
      bargs = app.beget(args);
      bargs['body'] = this._render(filename,args,false);
      return this._render(args['layout'],bargs,false);
    }  
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
    
    var cacheKey = app.md5(filename);
    fn = this._cache[ cacheKey ];
    if(fn){ 
      console.log('\u001b[36mRender tmpl use cache - {'+ filename +'} \u001b[0m');
      return fn(args);
    }
    else{
      console.log('\u001b[36mInclude file and render it - {'+ filename +'} \u001b[0m');
      if(path.existsSync(filename)){
        var ctx = fs.readFileSync(filename,'utf-8');
        fn = this._compile(ctx);
        this._cache[ cacheKey ] = fn;
        return fn(args);
      }
      else if(!forceFile) {
        this._cache[ cacheKey ] = function(){ return ''; };
        return ''; 
      }
      else { app.res.end('Error:'+ filename + ' not exists.'); } 
    }
    
  },
  '_compile': function(ctx){
    var code = "var out='"+
      ctx.replace(/\\/g,"\\\\").
      replace(/'/g, "\\'").
      replace(/\{\{(.+?)\}\}/g, function(m,nmatch){
        return "'+"+ nmatch.replace(/\\/g,'') +"+'";
      }).
      replace(/\s*<%(.+?)%>/g, function(m,nmatch){
        return "';"+ nmatch.replace(/\\/g,'') +" out+='";
      }).
      replace(/\n/g,"'+\"\\n\"+'") +"';return out;";    
    //console.log(code);return new Function();
    return new Function('it',code);
  }
}

/* static mime type */
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

/* store user's session data */
var _sessionData = {}

var http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    url  = require('url'),
    zlib = require('zlib'),
    querystring = require('querystring');

module.exports = {
  'configure': function(config){
    app.config = config;
    return this;
  },
  'run': function(){
    /*------------------------------+ Http Server +------------------------------*/
    http.createServer(function(req, res){
      res.setHeader('Server', 'NodeX/0.3');
      res.setHeader('X-Powered-By', 'node.js');
      
      var startTimer = new Date();
      console.log(startTimer + ' - ' + req.url);
      
      if(req.url.slice(1,7) == 'assets' || req.url == '/favicon.ico'){
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
      }
      else{
        var rx = url.parse(req.url, true);
        var controller_action = rx.pathname.slice(1).split('/');
        
        app.get = rx.query;
        app.get['controller'] = controller_action[0] ? controller_action.shift() : 'index';
        app.get['action'] = controller_action[0] ? controller_action.shift() : 'index';
        app.get['querypath'] = controller_action;
        app.req = req;
        app.res = res;
        app.cookie._cookieGetData='';
        app.cookie._cookieSetData=[];
        app._postData = '';
        
        req.on('data', function(chunk){// please use formidable.
          if(req.headers['content-type'] == 'application/x-www-form-urlencoded') app._postData += chunk;
        }).on('end', function(){
          if(app._postData) app.post = querystring.parse(app._postData);
          try{
            controllers = require(__dirname+'/app/controllers/'+ app.get.controller +'.js')['controller'];
            if( typeof(controllers['__construct']) == "function" ) controllers['__construct']();
            controllers[ app.get.action ]();
            if( typeof(controllers['__destructor']) == "function" ) controllers['__destructor']();
            console.log('\u001b[31mThe operation cost:'+ (new Date().getTime() - startTimer.getTime()) +'ms\u001b[0m');
          }catch(e){
            //TODO: production: 404 dev: 500
            res.end("Error:" + e.message);
            console.log(e.stack);
            return 0;
          }
        });
      }
    }).listen(app.config.PORT);
    console.log('Server running at port ' + app.config.PORT);
    /*------------------------------+ Http Server +------------------------------*/
  }
};



