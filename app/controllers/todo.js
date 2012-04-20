/**
 * index page
 */
var mysql = require('mysql');
client = mysql.createClient({ user: 'root', password: '111111',});
client.useDatabase('todo');

exports.controller = {    
  'index': function(){
    // app.res.setHeader("content-type", "text/html; charset=UTF-8");  
    client.query('SELECT * FROM todo order by id desc', function (err, results, fields) {
      if (err) { app.end(err.message); }
      
      // dump(results);
      app.render('todo/index', {'data': results, 'title': 'nodex demo: todo'});
    });
    
  },
  'new': function(){
    client.query("insert into todo set title='"+ app.post.title +"',finished=0,post_date=now()", function (err,results) {
      if (err) { app.end(err.message); }
      else{
        app.redirect('/todo');
      }
    });
  },
  
  'finish': function(){
    var finished = app.get.status == 'yes' ? 0 : 1;
    client.query('update todo set finished='+ finished +' where id='+ app.get.id, function (err,results) {
        if (err) { app.end(err.message); }
        else app.redirect('/todo');
      }
    );
  },
  
  'delete': function(){
    var finished = app.get.status == 'yes' ? 1 : 0;
    client.query('delete from todo where id='+ app.get.querypath[0], function (err) {
      if (err) { app.end(err.message); }
      else app.redirect('/todo');
    });
  },
  
  'edit': function(){
    var id = app.get.querypath[0];
    if(app.post.title) {
      client.query("update todo set title=? where id="+ id,[app.post.title], function (err,results) {
        if (err) { app.end(err.message); }
        else{
          app.render('tips', {layout:false, 'message':"修改成功！", title:'success'});
        }
      });
    }
    else{
      client.query('select * from todo where id='+ id, function (err,results) {
        if (err) { app.end(err.message); }
        else{
          // dump(results);
          app.render('todo/edit', {'title': results[0].title});
        }
      });
    }
  }
};
