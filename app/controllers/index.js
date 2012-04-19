/**
 * index page
 */

exports.controller = {    
  'index': function(){
    app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'NodeX Start'});
  }
};
