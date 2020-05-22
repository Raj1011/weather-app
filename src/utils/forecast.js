const request = require('request');

const forecast = (lat, long , callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=662de58a4df8c8c00a61fc611fefe90c&query="+ lat +"," + long;

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect weather service!', undefined);
        }else if(body.error){
            callback("Unable to find location. Try another!", undefined)
        }else{
            const current = body.current;
            const returnStr = current.weather_descriptions[0]+ ". It is currently "+ current.temperature+ " degrees out. There is " + current.precip + "% chances of rain."
            callback(undefined, returnStr);
        } 
    });

}

module.exports = forecast;