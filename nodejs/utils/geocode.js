// Imports the request node module.
const request = require('request');

// Defines the geocode function to be used which handles errors and returns address coordinates and location asynchrously. 
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXBhdTg4IiwiYSI6ImNqdjhyemQwNDAzM3U0MnJ5bW9ndHI4bXoifQ.JjTAqjq-WeON4_zK7naPEw&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    });
}

// Exports the geocode function to be used.
module.exports = geocode;