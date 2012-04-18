# NodeX

@version: v0.3 preview

Fast 、Simpleness (only one file ,run it) web framework for <a href="http://nodejs.org/" target="_blank">node</a>.

You can easily modify it.

## Installation

**Use npm install**

    npm install nodex

**Clone it from github**

    git clone git://github.com/wangxian/nodex.git

## Quick start

```javascript
node server.js
```
And then view http://localhost:8888/ , you can find server is running .
port is 8888, You can modify file config.js , ```PORT: 8888```

# URL & GET & POST

Nodex use the controller and method of the url.

For example:
    
    http://localhost:8888/note/list
    // Point to `app/controllers/note.js` and `list` action

    http://localhost:8888/
    // Point to `app/controllers/index.js` and `index` action

    http://localhost:8888/index
    // Point to `app/controllers/index.js` and `index` action

    http://localhost:8888/note
    // Point to `app/controllers/note.js` and `index` action


In controller get HTTP GET\POST

 ```javascript 

// print all get
dump( app.get );

// print all post
dump( app.post );

// htttp://localhost:8888/note/list?id=12
// get id=?
dump( app.get.id );

```

# cookie and session

```javascript

// set cookie expires 20s
app.cookie.set( {name:'aa',value:'aa',expires:20} );

// get cookie, if not set yourkey, return all your cookie
app.cookie.get('yourkey');


// set cookie now = new Date()
app.session.set('now',new Date());

// get session, if not set yourkey, return all your session 
app.session.get('yourkey');

```


# Layout your page

```javascript
// @file:index.js

exports.controller = {    
  index: function(){
    app.res.setHeader("content-type", "text/html; charset=UTF-8");
    app.render('index/index', {'name':'nodex'});
  }
}

```


# License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
