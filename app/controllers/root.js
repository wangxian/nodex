/**
 * root controller
 */

this.controller = {
    // __construct: function(){
        // console.log("root __construct init...");
    // },
    add: function (){
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
