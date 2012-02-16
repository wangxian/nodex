/**
 * blog page
 */

this.blog = app.extend('root', {
    del: function (){
        app.res.write("blog:"+app.req.url);
        app.res.end();
    }
});
