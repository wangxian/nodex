/**
 * module: node-mongodb-native
 * https://github.com/mongodb/node-mongodb-native
 */

var mongodb = require('mongodb');
var assert  = require('assert');

var db = new mongodb.Db('todo', new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: false, poolSize: 4}), {native_parser: false});

// Establish connection to db
db.open(function(err, db) {
  if(err) cnsole.log(err);
  
  // Fetch a collection to insert document into
  db.collection("test", function(err, collection) {
    
    // Insert a single document
    // collection.insert({"hello":'world_no_safe'}, function(err, result){
      // console.log(result);
    // });
    
    // Fetch the document
    // collection.findOne( function(err, doc) {
      // console.log(doc);
// 
      // // 不推荐save更新
      // // doc.hello = 'wangxian';
      // // collection.save(doc);
//       
      // db.close();
    // });
    
    // save
    // collection.save({hello:'world'});
    // db.close();
       
    // find all 
    // collection.find({}).toArray(function(err, docs) {
      // console.log(docs);
      // db.close();
    // });
    
    // update all
    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#update
    /*
    db.collection.update( criteria, objNew, upsert, multi )
      criteria : update的查询条件，类似sql update查询内where后面的
      objNew   : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
      upsert : 这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
      multi : mongodb默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
    */
    // collection.update({}, {$set:{a:35}}, {upsert:true, multi:true}, function(err, result) {
      // console.log(arguments);
      // db.close();
    // });
    
    collection.remove({a:1},{safe:true}, function(err, result) {
      console.log(err, result);
      db.close();
    });
    
    
  });

  // Close the connection with a callback that is optional
  // db.close(function(err, result) {
    // console.log(arguments);
  // });
});
 
 
 
