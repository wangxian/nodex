/*
 * nodex-1.3
 * project start 2012-3-12
 * edited at 2014-07-30
 * copyright(c) 2014 WangXian <wo@wangxian.me>
 * MIT Licensed
 */

/*jslint node: true */
/* jshint undef: true, unused: false, evil: true */
var http = require('http');
var fs   = require('fs');
var path = require('path');
var url  = require('url');
var zlib = require('zlib');
var querystring = require('querystring');

// app config store
var config = {};

// Store user's session data
var sessionData = {};

// app util functions
var util = {
  log: function(str){
    console.log(str);
  },
  beget: function(obj){
    var func = function(){};
    func.prototype = obj;
    return new func();
  },
  extend: function(parent, child){
    var c = require(config.ROOTDIR +'/app/controllers/'+ parent);
    var vchild = this.beget(c);
    for(var k in child){ vchild[k] = child[k]; }
    return vchild;
  },
  md5: function(str){
    return require("crypto").createHash("md5").update(str).digest("hex");
  },
  encodeHTML: function (A){
    return String(A).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  },
  decodeHTML: function (B){
    return String(B).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&#([\d]+);/g,function(C, D){
      return String.fromCharCode(parseInt(D,10));
    });
  },
};

function cookie(req, res) {
  var cookieGetData = "";
  var cookieSetData = [];
  return {
    get: function(name){
      if(cookieGetData === ""){
        if(!req.headers.cookie) return "";

        cookieGetData = {};
        var pairs = req.headers.cookie.split(";");
        for(var i=0; i<pairs.length; i++){
          var kv = pairs[i].split("=");
          if(kv[0]){ cookieGetData[kv[0]] = kv[1] || ""; }
        }
      }
      return name ? (cookieGetData[name] || "") : cookieGetData;
    },

    set: function(cookieObj){
      /* {'name':"",'value':"", 'expires':1334112331, 'path':'/', 'domain':"", 'secure':false, 'httponly':false} */
      if(! cookieObj.name) throw new Error('In setCookie([object] cookieObj) ,cookieObj must has key "name"');
      var cookieString = cookieObj.name +'='+  encodeURI(cookieObj.value||"");

      if(typeof cookieObj.expires != 'undefined'){ var now=new Date(); now.setTime( now.getTime() + cookieObj.expires*1000 ); cookieString += '; expires='+ now.toUTCString(); }
      if(cookieObj.path){ cookieString += "; path="+ cookieObj.path; }
      if(cookieObj.domain){ cookieString += "; domain="+ cookieObj.domain; }
      if(cookieObj.secure){ cookieString += "; secure"; }
      if(cookieObj.httponly){ cookieString += "; httponly"; }

      cookieSetData[cookieSetData.length] = cookieString;
      res.setHeader('Set-Cookie', cookieSetData);
    }
  };
}

function session(req, res) {
  return {
    sessionName: "NODEXSID",
    lifetime:1440,

    sessionId: function(){
      return req.cookie.get(this.sessionName);
    },

    init: function(){
      // get sessionid from cookie
      var sessionId = this.sessionId();

      if( !!sessionId && sessionData[sessionId] ){
        if( sessionData[sessionId].updated + this.lifetime*1000 >= new Date().getTime() ){
          sessionData[sessionId].updated = new Date().getTime(); return sessionId;
        } else{
          delete sessionData[sessionId];
        }
      }
      sessionId = (1e13*Math.round(Math.random() * 10000) + new Date().getTime()).toString(32);
      req.cookie.set({
        name    : this.sessionName,
        value   : sessionId,
        path    : "/",
        expires : 2592000
      });
      sessionData[sessionId] = {updated: new Date().getTime(), data: {}};
      return sessionId;
    },

    get: function(key){
      var sessionId = this.init();
      if(sessionData[sessionId]){
        return key ? ( sessionData[sessionId].data[key] || "") : sessionData[sessionId].data;
      }
      else return "";
    },

    // return all session data
    gods: function(){ return sessionData; },

    set:function(key,value){
      sessionData[this._init()].data[key] = value;
    },

    delete:function(key){
      delete sessionData[this._init()].data[key];
    },

    // delete all session
    clear: function(){
      sessionData[this._init()].data = {};
    }
  };
}

// app view template
function view(req, res) {
  return {
    'render': function(filename,args){
      args = args || {};
      if(args.layout === false) {
        return this.preRender(filename,args,false);
      }
      else{
        if(typeof args.layout === "undefined") args.layout = 'layout.html';
        var bargs = util.beget(args);
        bargs.body = this.preRender(filename, args, false);
        return this.preRender(args.layout, bargs, false);
      }
    },

    partial: function(filename, args){
      return view.preRender(filename,args,true);
    },

    header: function(filename, args){
      return view.preRender(filename,args,false);
    },

    cache: {},
    preRender: function(filename,args,forceFile){
      args= args||{}; args.partial=this.partial;args.header=this.header;
      if(! filename){
        filename = config.ROOTDIR +'/app/views/'+ req.get.controller+'/'+ req.get.action+'.html';
      } else {
        if(filename.lastIndexOf('.html')==-1) filename+='.html';
        filename = config.ROOTDIR+'/app/views/'+filename;
      }

      var cacheKey = util.md5(filename);
      var fn = this.cache[ cacheKey ];
      if(fn){
        util.log('\u001b[36mRender tmpl use cache - {'+ filename +'} \u001b[0m');
        return fn(args);
      }
      else{
        util.log('\u001b[36mInclude file and render it - {'+ filename +'} \u001b[0m');
        if(fs.existsSync(filename)){
          var ctx = fs.readFileSync(filename,'utf-8');
          fn = this.compile(ctx);
          this.cache[ cacheKey ] = fn;
          return fn(args);
        }
        else if(!forceFile) {
          this.cache[ cacheKey ] = function(){ return ""; };
          return "";
        }
        else { res.end('Error:'+ filename + ' not exists.'); }
      }
    },

    // Compile html string
    compile: function(str){
      var code = "var out='"+
        str.replace(/\\/g,"\\\\").
        replace(/'/g, "\\'").
        replace(/\{\{(.+?)\}\}/g, function(m,nmatch){
          return "'+"+ nmatch.replace(/\\/g,"") +"+'";
        }).
        replace(/\s*<%(.+?)%>/g, function(m,nmatch){
          return "';"+ nmatch.replace(/\\/g,"") +" out+='";
        }).
        replace(/\n/g,"'+\"\\n\"+'") +"';return out;";

      // util.log(code);return new Function();
      return new Function('it',code);
    }
  };
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


// module object
module.exports = {

  // set app config
  set: function(name, value){
    if (typeof name === "object"){
      config = name;
      if(!!config.PORT) config.PORT = "8080";
      if(!!config.DEV) config.DEV = false;
      if(!!config.ROOTDIR) config.ROOTDIR = process.cwd();
    } else {
      config[name] = value;
    }
  },

  // get app config
  get: function(name){
    return config[name];
  },

  // usually util
  util: util,

  run: function(){
    http.createServer(function(req, res){
      res.setHeader('Server', 'nodex/0.3');
      res.setHeader('X-Powered-By', 'node.js');

      var startTimer = new Date();
      util.log(startTimer + ' ' + req.url);

      if(req.url.slice(1,7) == 'assets' || req.url == '/favicon.ico'){
        var filename = config.ROOTDIR + req.url.replace(/\.\./g, "");
        fs.stat(filename, function(error, stat){
           if(error) {
             res.writeHead(500, {'content-type': 'text/plain'});
             res.end('404 File Not Found.');
           } else {
            var lastModified = stat.mtime.toUTCString();
            res.setHeader("Last-Modified", lastModified);
            if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
              res.writeHead(304, "Not Modified");
              res.end();
            } else {
              res.setHeader('Content-Type', contentTypes[ filename.slice(filename.lastIndexOf('.')+1) ] || 'text/plain');

              if(/\.(gif|png|jpg|js|css)$/i.test(filename)){
                var expires = new Date();
                expires.setTime( expires.getTime() + (86400000 * 15) );
                res.setHeader("Expires",  expires.toUTCString());
                res.setHeader("Cache-Control", "max-age="+ (86400 * 15));
              }

              var raw = fs.createReadStream(filename);
              var acceptEncoding = req.headers['accept-encoding'] || "";
              var matched = /\.(html|js|css)$/i.test(filename);
              if(matched && /\bgzip\b/.test(acceptEncoding)){
                res.writeHead(200, {'Content-Encoding': 'gzip'});
                raw.pipe(zlib.createGzip()).pipe(res);
              } else if(matched && /\bdeflate\b/.test(acceptEncoding)) {
                res.writeHead(200, {'Content-Encoding': 'deflate'});
                raw.pipe(zlib.createDeflate()).pipe(res);
              } else {
                res.writeHead(200);
                raw.pipe(res);
              }
            }
           }
        });
      } else {

        // Parse url query
        var rx = url.parse(req.url, true);

        // set url to request
        req.url = rx;

        // An array of controller and action
        var ca = rx.pathname.slice(1).split('/');

        req.get = rx.query;
        req.get.controller = ca[0] ? ca.shift() : 'index';
        req.get.action = ca[0] ? ca.shift() : 'index';
        req.post = {};
        req.postRawData = "";

        // log detail object
        res.dump = function(data){
          for(var i=0; i<arguments.length; i++){
            res.write( '<pre>'+ require('util').inspect(arguments[i]) + '</pre>');
          }
        };

        // Quick function
        res.redirect = function(url){
          res.writeHeader(302, {"Location": url});
          res.end();
        };

        // Render view template
        req.render = function(filename, args) {
          try{
            return res.end(view.render(filename, args));
          } catch(e) {
            util.log(e.stack);
            res.end(e.message);
          }
        };

        // Support cookie and session
        req.cookie = cookie(req, res);
        req.session = session(req, res);

        // for dev,
        // if is dev env then delete required modules
        if(config.DEV){
          for(var k in require.cache) { delete require.cache[k]; }
          view.cache = {};
        }

        // if from please use formidable.
        req.on('data', function(chunk){
          if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            req.postRawData += chunk;
          }
        }).on('end', function(){
          if(req.postRawData !== "") {
            req.post = querystring.parse(req.postRawData);
          }

          try {
            var controllers = require(config.ROOTDIR +'/app/controllers/'+ req.get.controller +'.js');

            // Support __contruct function
            if(typeof controllers.__construct === "function" ) {
              controllers.__construct(req, res);
            }

            // invoke controller's action
            controllers[ req.get.action ](req, res);

            if(typeof controllers.__destructor === "function" ) {
              controllers.__destructor(req, res);
            }

            util.log('\u001b[31mcost:'+ (new Date().getTime() - startTimer.getTime()) +'ms\u001b[0m');
          } catch(e) {
            //TODO: production: 404 dev: 500
            res.end("Error:"+ e.message);
            util.log(e.stack);
            return 0;
          }
        });
      }
    }).listen(config.PORT);

    util.log('server running at http://127.0.0.1:'+ config.PORT);
  }
};



