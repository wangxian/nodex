/**
 * index page
 */

exports.controller = {
    
    // __construct: function(){
        // console.log("index init...");
    // },
    
    index: function(){
        // app.res.setHeader("content-type", "text/html; charset=UTF-8");
        // app.res.write("app.post");
        // app.dump(app.post);
        
        //app.dump(app.req.headers);
        //app.dump(app.get);
        

        view.render('index/index.html',{'name':'nodex'});
    }
};
