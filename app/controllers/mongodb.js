
/**
 * module: node-mongodb-native
 * https://github.com/mongodb/node-mongodb-native
 */

this.controller = {
  'index': function(){
    var mongodb = require('mongodb');
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    new mongodb.Db('test', server, {}).open(function (error, client) {
      if (error) throw error;
      var collection = new mongodb.Collection(client, 'test');
      collection.find({}, {limit:10}).toArray(function(err, docs) {
        console.log(docs);
        docs.forEach(function(v){
          console.log(v._id);
        })
        app.res.end();
      });
    });
    
  }
}
