// Imports all modules
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Calls the geocode function, passing in an address as the first parameter and a callback function as the second parameter.
geocode('Calgary', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
})