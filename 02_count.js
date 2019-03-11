var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);
console.log('number of vehicle entries : ' + db.get('vehicles').size().value());