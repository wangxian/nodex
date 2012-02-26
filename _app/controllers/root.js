/**
 * root controller
 */

this.controller = {
    // __construct: function(){
        // console.log("root __construct init...");
    // },
    add: function (){
        app.res.write("root:"+app.req.url);
        app.res.end();
    },
    list: function (){
        app.res.write("root:"+app.req.url);
        app.res.end();
    },
    del: function (){
        app.res.write("root:"+app.req.url);
        app.res.end();
    },
    update: function (){
        app.res.write("root:"+app.req.url);
        app.res.end();
    }
};
