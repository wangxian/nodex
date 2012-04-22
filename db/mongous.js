/**
 * module test mongous
 * https://github.com/amark/mongous
 */
var controller = {};
controller.index = function(){
  var $ = require("mongous").Mongous;
  
  $("test.test").save({name:'wx-4'});
  $("test.test").find(function(ret){
    // console.dir(ret.documents);
    // console.log(ret);
  });
  
  $("test.test").find({name:/wx/}, {name: 1}, {limit: 1, skip: 2}, function(ret){
    // console.dir(ret.documents);
    console.log(ret.documents);
  })

  app.res.end();
};

this.controller = controller;
