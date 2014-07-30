/**
 * blog page
 */

this.controller = app.extend('root', {
    index: function(){
      app.redirect('http://www.qq.com');
    },

    del: function (){
      // console.log(this.__proto__);
      dump(app.get, app._postData,app.post, 123,345);
      print("blog:"+ app.req.url);
    }
});
