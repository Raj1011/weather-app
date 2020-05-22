const request = require('request');

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicmFqMTAxMSIsImEiOiJjazlmejN1ZmowYjF3M2ZtazZ5bW93aDllIn0.v6BLpgukIwL1MBHIGhK4nw";
    console.log('APi url: ', url);
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to geo location!', undefined);
        }else if(body.features.length === 0){ 
            callback('Unable to find the location. Please try with another location!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;