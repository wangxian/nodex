/**
 * root controller
 */

exports.controller = {
    'index': function(){
      app.session.set('now',new Date());
      app.res.end();
    },
    'get':function(){
      dump( app.session.get() );
      app.res.end();
    },
    'all-client':function(){
      // 获取所有 人 的session
      dump( app.session.gods() );
      app.res.end();
    },
    'session_id':function(){
      app.res.end( (1e13*Math.round(Math.random() * 10000) + new Date().getTime()).toString(32) );
    },
};
