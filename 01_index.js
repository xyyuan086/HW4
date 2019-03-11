var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);
var fetch = require('node-fetch')

// init the data store
db.defaults({vehicles:[]}).write();

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=77d03edfadfd488fb775e572b679bdfd&filter[route]=1&include=trip';	
	const res = await fetch(url);
	data = await res.json();
    return data.data;
    console.log(data);
};

async function createBus(){
    var buses = await getBusLocations();
    buses.forEach(function(bus){
        var vehicle = {
            id: bus.id,
            label: bus.attributes.label,
            direction_id: bus.attributes.direction_id,
            latitude: bus.attributes.latitude,
            longitude: bus.attributes.longitude
        };
    db.get('vehicles').push(vehicle).write()    
    });
};

let timerId = setInterval(createBus, 15000);
setTimeout(() => {clearInterval(timerId)}, 3601000);

