/**
 * index page
 * use mongodb todo-mongodb
 */
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/todo');
db.bind('todo');

// db.todo-mongodb.save({title:"new todo-mongodb",finished:0,post_date:new Date()});

exports.controller = {    
  'index': function(){
    // app.res.setHeader("content-type", "text/html; charset=UTF-8");
    db.todo-mongodb.find().toArray(function(err, results){
      if (err) { app.end(err.message); }
      
      // dump(results);
      app.render('todo-mongodb/index', {'data': results, 'title': 'nodex demo: todo-mongodb'});
    });    
  },
  
  'new': function(){
    db.todo-mongodb.insert({title:app.post.title,finished:0,post_data: new Date()}, function (err,results) {
      if (err) { app.end(err.message); }
      else{
        app.redirect('/todo-mongodb');
      }
    });
  },
  
  'finish': function(){
    var finished = app.get.status == 'yes' ? 0 : 1;
    client.query('update todo-mongodb set finished='+ finished +' where id='+ app.get.id, function (err,results) {
        if (err) { app.end(err.message); }
        else app.redirect('/todo-mongodb');
      }
    );
  },
  
  'delete': function(){
    var finished = app.get.status == 'yes' ? 1 : 0;
    client.query('delete from todo-mongodb where id='+ app.get.querypath[0], function (err) {
      if (err) { app.end(err.message); }
      else app.redirect('/todo-mongodb');
    });
  },
  
  'edit': function(){
    var id = app.get.querypath[0];
    if(app.post.title) {
      client.query("update todo-mongodb set title=? where id="+ id,[app.post.title], function (err,results) {
        if (err) { app.end(err.message); }
        else{
          app.render('tips', {layout:false, 'message':"修改成功！", title: 'success'});
        }
      });
    }
    else{
      client.query('select * from todo-mongodb where id='+ id, function (err,results) {
        if (err) { app.end(err.message); }
        else{
          // dump(results);
          app.render('todo-mongodb/edit', {'title': results[0].title});
        }
      });
    }
  }
};
