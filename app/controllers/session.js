/**
 * root controller
 */

this.controller = {
    // __construct: function(){
        // console.log("root __construct init...");
    // },
    add: function (){
      app.res.writeHead(200, {'content-type':'text/html'});
      app.print( app.encodeHTML('<html></html>') );
      app.print("root:"+app.req.url);
    },
    list: function (){
      app.print("root:"+app.req.url);
    },
    del: function (){
      app.print("root:"+app.req.url);
    },
    update: function (){
      app.print("root:"+app.req.url);
    }
};
