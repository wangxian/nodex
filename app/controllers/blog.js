/**
 * blog page
 */

this.controller = app.extend('root', {
    index: function(){
      app.redirect('http://www.qq.com');
    },
    del: function (){
      //app.dump(this);
      app.print("blog:"+ app.req.url);
    }
});
