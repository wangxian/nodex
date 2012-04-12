/**
 * index page
 */

exports.controller = {    
  index: function(){
    //app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'nodex'});
  },
  
  'tmpl-cache-view': function(){
    dump( view._cache );
    app.res.end();
  },
  'tmpl-cache-del': function(){
    view._cache = {};
    app.res.end();
  }
};
