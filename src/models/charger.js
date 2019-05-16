const mongoose = require('mongoose')
const validator = require('validator')

// Creates mongoose data model for a charger object and adds validator to data
const Charger = mongoose.model('Charger', {
    owner: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
       required: true,
       trim: true
    },
    city: {
        type: String,
       required: true,
        trim: true
    },
    province: {
        type: String,
       required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            // Validation for max length
            if (value.length > 20) {
                throw new Error('Max length for charger name can only be 20 characters.')
            }
        }
    },
    level: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            // Validation to level is 1 or 2
            if (value !== 1 && value !== 2) {
                throw new Error('Charger level is invalid')
            }
        }
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