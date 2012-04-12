/**
 * root controller
 */

this.controller = {
    // __construct: function(){
        // console.log("root __construct init...");
    // },
    add: function (){
      app.res.writeHead(200, {'content-type':'text/html'});
      print( app.encodeHTML('<html></html>') );
      print("root:"+ app.req.url);
    },
    list: function (){
      print("root:"+app.req.url);
    },
    del: function (){
      print("root:"+app.req.url);
    },
    update: function (){
      print("root:"+app.req.url);
    },
    '__destructor': function(){
      app.res.end();
    }
};
