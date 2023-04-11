DBClass = require('./DBClass.js');
let user = DBClass.user("222", "joe", "joe@email.com", "123", "132", "user");
console.log("object:" + user);
console.log("json object:" + JSON.stringify(user));
