/**
 * blog page
 */

this.blog = app.extend('root', {
    index: function(){
        // app.res.writeHeader(301, {"Location": "http://www.soso.com"});
        // app.res.end();
        app.redirect('http://www.qq.com');
    },
    del: function (){
        app.res.write("blog:"+ app.req.url);
        app.res.end();
    }
});
