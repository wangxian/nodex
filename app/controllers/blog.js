/**
 * blog page
 */

this.controller = app.extend('root', {
    index: function(){
      app.redirect('http://www.qq.com');
    },
    del: function (){
      // dump(this);
      print("blog:"+ app.req.url);
    }
});
