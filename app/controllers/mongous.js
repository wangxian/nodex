/**
 * module test mongous
 * https://github.com/amark/mongous
 */
var controller = {};
controller.index = function(){
  var $ = require("mongous").Mongous;
  
  $("test.test").save({name:'wx-2'});
  $("test.test").find(function(ret){
    console.dir(ret.documents);
  })

  app.res.end();
};

this.controller = controller;
