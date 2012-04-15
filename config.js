var mysql = require('mysql');
client = mysql.createClient({ user: 'root', password: '111111',});
client.useDatabase('todo');

this.config = {
  'PORT': 8888
}