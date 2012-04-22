/**
 * module test mongoskin
 * https://github.com/guileen/node-mongoskin
 */

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/test');

console.log(mongo);

// test ObjectID
// console.log(new db.ObjectID.createFromHexString('4f8a9baa1f6abe4cb8c83d53'));
// console.log(db.id('4f8a9baa1f6abe4cb8c83d53'));

db.close();

process.exit();

/**/
db.find().toArray(function(err, items){
  // console.dir(items);
});

db.find(function(err, cursor){
  // cursor.toArray(function(err,items){ console.log(items); })
});

db.findOne({name:'wangxian'},function(err, items){
  //console.dir(items);
});

db.findOne({_id: db.id('4f8a9baa1f6abe4cb8c83d53')},function(err, items){
  //console.dir(items);
});

// db.update({_id: db.id('4f8a9baa1f6abe4cb8c83d53')}, {name:"wangxian-t20"}, function(){
  // console.log(arguments);
// });

db.updateById(db.id('4f8a9baa1f6abe4cb8c83d53'), {$set:{name:"wangxian-12"}}, function(){
  //console.log(arguments);
});

// bind collection MVC

// db.bind('test', {
   // findTop10 : function(fn){
     // this.find({}, {limit:10, sort:[['name', -1]]}).toArray(fn);
   // },
   // removeTagWith : function(tag, fn){
     // this.remove({tags:tag},fn);
   // }
// });
var db = mongo.db('localhost:27017/user');
db.bind('user');

db.user.save({'name':'wx'}, function(err, info){
  console.dir(info);
});

db.user.find({}).sort({_id:1}).toArray(function(err, items){
  // console.dir(items);
});
app.res.end();

// db.user.save({name:'wx', time: new Date()}, function(err,info){
  // console.log(info);
// });
// db.user.findAndModify(
  // {hello: 'world'}, // query
  // [['_id','asc']],  // sort order
  // {$set: {hi: 'there'}}, // replacement, replaces only the field "hi"
  // {}, // options
  // function(err, object) {
    // if (err){
        // console.warn(err.message);  // returns error if no matching object found
    // }else{
        // console.dir(object);
    // }
  // }
// );

// app.res.end();
/**/

