/**
 * index page
 */

exports.controller = {    
  index: function(){
    //app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'nodex'});
  },
  
  'tmpl-cache-view': function(){
    app.dump( view._cache );  
  },
  'tmpl-cache-del': function(){
    view._cache = {};
  }
};
