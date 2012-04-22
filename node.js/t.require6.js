/**
 * exports
 */

require('./t.require5.js');
// console.log (require.cache );
// delete require.cache['/Users/wangxian/Sites/nodejs/nodex-tests/node.js/t.require5.js'];
for(key in require.cache) delete require.cache[key];
require('./t.require5.js');
