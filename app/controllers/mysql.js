/**
 * mysql 测试
 */

var mysql = require('mysql');
client = mysql.createClient({ user: 'root', password: '111111',});
client.useDatabase('todo');

this.controller = {
  'index': function(){
    
    client.query(
      'SELECT * FROM todo', function (err, results, fields) {
        if (err) { print(err.message); }
    
        // dump(results[0].post_date.getTime());
        dump(results);
        // dump(fields);
        // client.end();
        app.res.end();
      }
    );
    
  },
  'insert': function(){
    client.query(
      'INSERT INTO todo '+
      'SET title = ?, post_date = ?',
      ['super cool', '2010-08-16 10:00:23'],
      function(err,results,fields){
        if(err) dump(err);
        dump(results);
        // client.end();
        
        app.res.end();
      }
    );
    
  },
  'del': function(){
    client.query('delete from todo where id>17', function(err,info){
      if(err) dump(err);
      dump(info);
      // client.end();
      
      app.res.end();
    });
  },
}
