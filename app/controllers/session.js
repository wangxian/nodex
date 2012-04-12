/**
 * root controller
 */

exports.controller = {
    'index': function(){
      app.session.set('name','wangxian');
    },
    'get':function(){
      app.dump( app.session.get() );
    },
    'all-client':function(){
      // 获取所有 人 的session
      app.dump( app.session.gods() );
    },
    'session_id':function(){
      app.print( (1e13*Math.round(Math.random() * 10000) + new Date().getTime()).toString(32) );
    },
};
