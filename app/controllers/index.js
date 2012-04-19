/**
 * index page
 */

exports.controller = {    
  'index': function(){
    app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'nodex'});
  },
  
  'finish': function(){
    app.redirect('/');
  },
  
  'delete': function(){
    app.redirect('/');
    app.end();
  },
  
  'edit': function(){
    
    if(app.post.title) {
      app.render('tips', {layout:false, 'message':"修改成功！"});
    }
    else {
      app.render('index/edit');  
    }
  }
};
