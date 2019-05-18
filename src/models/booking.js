const mongoose = require('mongoose')
const validator = require('validator')

const Booking = mongoose.model('Booking', {
    charger: {
        type: String,
        required: true,
        trim: true
    },
    client: {
        type: String,
        required: true,
        trim: true
    },
    timeStart: {
        type: Date,
        required: true,
        trim: true
    },
    timeEnd: {
        type: Date,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true,
        trim: true
    },
    state: {
        type: String,
        default: 'PENDING'
    }
})

module.exports = Booking;