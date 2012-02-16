
var port = 8888;

var http = require('http'),
    querystring = require('querystring'),
    url = require('url');

http.createServer(function(req, res){
	res.setHeader('Server', 'eNode/0.1');
	res.setHeader('X-Powered-By', 'node.js');
	console.log(req.url);
	
	var _postData = '';
	req.on('data', function(chunk){
		_postData += chunk;
	}).on('end', function(){
	    /*get & post*/
		req.postv = querystring.parse(_postData);
		var rx = url.parse(req.url, true);
		var controller_action = rx.pathname.slice(1).split('/');
		req.getv = rx.query;
		req.getv['controller'] = controller_action[0] ? controller_action.shift() : 'index';
		req.getv['action'] = controller_action[0] ? controller_action.shift() : 'index';
		req.getv['pathquery'] = controller_action; 
		
		res.dump = function(variables){
		    this.write( '<pre>'+ require('util').inspect(variables) + '</pre>' );
		}
		try{
    		controllers = require('./_app/controllers/'+ req.getv.controller)[ req.getv.controller ];
    		if( typeof(controllers['__construct']) == "function" ) controllers['__construct']();
    		controllers[ req.getv.action ](req, res);
		}
		catch(e){
		    //TODO: production: 404 dev: 500
		    res.end("Error:" + e.message);
		    return 0;
		}
	});
}).listen(port);
console.log('Server running at http://127.0.0.1:'+ port +'/');

app = {
    'extend': function(parent, child){
        for(i in dest){ if(typeof(child[i]) == undefined) child[i] = parent[i]; }
        return child;
    }
    
};



