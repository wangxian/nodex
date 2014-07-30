/**
 * index page
 * use mongodb todo-mongodb
 */
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/todo?auto_reconnect=true');
db.bind('todo');

// db.todo-mongodb.save({title:"new todo-mongodb",finished:0,post_date:new Date()});

exports.controller = {    
  'index': function(){
    // app.res.setHeader("content-type", "text/html; charset=UTF-8");
    db.todo.find().sort({'_id':-1}).toArray(function(err, results){
      if (err) { app.end(err.message); }
      
      // dump(results);app.end();
      app.render('todo-mongodb/index', {'data': results, 'title': 'nodex demo: todo-mongodb'});
    });    
  },
  
  'new': function(){
    db.todo.insert({title:app.post.title,finished:0,post_date: new Date()}, function (err,results) {
      if (err) { app.end(err.message); }
      else{
        app.redirect('/todo-mongodb');
      }
    });
  },
  
  'finish': function(){
    var finished = app.get.status == 'yes' ? 0 : 1;
    db.todo.update({_id: db.todo.id( app.get.id )},{$set:{"finished":finished}}, function (err,results) {
        if (err) { app.end(err.message); }
        else app.redirect('/todo-mongodb');
      }
    );
  },
  
  'delete': function(){
    db.todo.remove({_id: db.todo.id(app.get.querypath[0])}, function (err) {
      if (err) { app.end(err.message); }
      else app.redirect('/todo-mongodb');
    });
  },
  
  'edit': function(){
    var id = app.get.querypath[0];
    if(app.post.title) {
      db.todo.update({_id: db.todo.id(id)}, {$set:{ 'title': app.post.title }}, function (err,results) {
        if (err) { app.end(err.message); }
        else{
          app.render('tips', {layout:false, 'message':"修改成功！"});
        }
      });
    }
    else{
      db.todo.findOne({"_id": db.todo.id(id)}, function (err,results) {
        if (err) { app.end(err.message); }
        else{
          // dump(results);app.end();
          app.render('todo-mongodb/edit', {'title': results.title});
        }
      });
    }
  }
};
