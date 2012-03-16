/**
 * index page
 */

exports.controller = {
    
    // __construct: function(){
        // console.log("index init...");
    // },
    
    index: function(){
        //app.res.setHeader("content-type", "text/html; charset=UTF-8");
        // app.res.write("app.post");
        // app.dump(app.post);
        
        //app.dump(app.req.headers);
        //console.log(view._cache);


        app.render('index/index', {'name':'nodex'});
    },
    'view-cache': function(){
        app.dump( view._cache );  
    },
    'clear-cache': function(){
        view._cache = {};
        app.res.end();
    }
};
