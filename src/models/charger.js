const mongoose = require('mongoose');
const validator = require('validator');

// Creates mongoose data model for a charger object and adds validator to data
const Charger = mongoose.model('Charger', {
    owner: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
       required: true,
        trim: true
    },
    rate: {
        type: Number,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        trim: true
    }
})

module.exports = Charger