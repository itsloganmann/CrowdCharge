// Imports the request node module.
const request = require('request');

// Defines the forecast function.
const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2c025f802538851242ce55aec5146635/' + lat + ',' + long + '?units=ca';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, { 
                summary: body.daily.data[0].summary, 
                temp: body.currently.temperature, 
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

// Exports the forecast function.
module.exports = forecast;