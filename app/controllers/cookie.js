/**
 * blog page
 */

this.controller = app.extend('root', {
  'index':function(){
    
     // expires 有效秒数（从现在开始的秒数，如要删除cookie，把expires设置为负）     
     app.cookie.set( { 'name':'wangxian',
                      'value': Math.floor(((new Date()).getTime() - 30000)/1000), 
                      'expires': 40,
                      'path': '/'
                      // 'domain': '.loopx.cn'
                      // 'secure': true,
                      // 'httponly': true
                    });
     app.cookie.set( {name:'aa',value:'aa',expires:20} );

     // app.cookie.set( {name:'bb',value:'bb',expires:320} );
     // app.cookie.set( {name:'bb', expires: -320} ); // cookie bb is deleted
     
     // app.dump(app.req.headers);
  },
  'get':function(){
    app.dump(app.cookie.get());
  }
});
