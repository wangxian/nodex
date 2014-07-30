/**
 * index page
 */
console.log(require("nodex"));
module.exports = {
  index: function(req, res){
    // res.end("make a test");
    res.dump(res)
    // res.setHeader("content-type", "text/html; charset=UTF-8");
    // res.render('index/index', {'title':'NodeX Setup'});
  }
};
