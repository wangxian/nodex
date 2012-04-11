/**
 * index page
 */

exports.controller = {    
  index: function(){
    //app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'nodex'});
  },
  'setCookie':function(){
    
     // expires 有效秒数（从现在开始的秒数，如要删除cookie，把expires设置为负）     
     app.cookie.set( { 'name':'wangxian',
                      'value': Math.floor(((new Date()).getTime() - 30000)/1000), 
                      'expires': 40,
                      'path': '/'
                      // 'domain': '.loopx.cn'
                      // 'secure': true,
                      // 'httponly': true
                    });
     // app.cookie.set( {name:'aa',value:'aa',expires:20} );
//      
     // app.cookie.set( {name:'bb',value:'bb',expires:320} );
     // app.cookie.set( {name:'bb', expires: -320} ); // cookie bb is deleted
     
     app.dump(app.req.headers);
  },
  
  
  'getCookie':function(){
    app.dump(app.cookie.get());
  },
  
  
  'view-cache': function(){
    app.dump( view._cache );  
  },
  'clear-cache': function(){
    view._cache = {};
  },
  'tt':function(){
    app.print( (1e13*Math.round(Math.random() * 10000) + new Date().getTime()).toString(32) );
  }
};
