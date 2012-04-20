/**
 * index page
 */

exports.controller = {    
  'index': function(){
    console.dir( app.req.headers );
    console.dir( app.post );
    app.end();
    // app.res.setHeader("content-type", "text/html; charset=UTF-8");
    // app.render('index/index', {'title':'NodeX Setup'});
  }
};
