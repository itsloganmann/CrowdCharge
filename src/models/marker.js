const mongoose = require('mongoose')
const validator = require('validator')

// Creates mongoose data model for a marker object and adds validator to data
const Marker = mongoose.model('Marker', {
    charger: {
        type: String,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
})

module.exports = Marker