
var port = 8888;

app = {
    'extend': function(parent_name, child){
        var parent = require('./_app/controllers/'+ parent_name)[parent_name];
        for(i in parent){ if( typeof(child[i]) == "undefined") { child[i] = parent[i]; } }
        return child;
    },
    dump: function(variables){
        this.res.write( '<pre>'+ require('util').inspect(variables) + '</pre>' );    
    }
};


require('http').createServer(function(req, res){
	res.setHeader('Server', 'eNode/0.1');
	res.setHeader('X-Powered-By', 'node.js');
	console.log(req.url);
	
	var _postData = '';
	req.on('data', function(chunk){
		_postData += chunk;
	}).on('end', function(){
	    /*get & post*/
		app.post = require('querystring').parse(_postData);
		var rx = require('url').parse(req.url, true);
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
}).listen(port);
console.log('Server running at http://127.0.0.1:'+ port +'/');





