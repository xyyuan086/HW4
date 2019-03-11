var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

var busID = db.get('vehicles').map('id').value();
var unique = [];

var result = busID.forEach(function(bus){
    if(unique.includes(bus)){
        unique;
    }
    else{
        unique.push(bus);
    };
});

console.log('number of unique bus IDs: ' + unique.length);