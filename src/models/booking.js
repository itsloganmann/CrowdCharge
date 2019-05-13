const mongoose = require('mongoose')
const validator = require('validator')

// Creates mongoose data model for a booking object and adds validator to data
const Booking = mongoose.model('Booking', {
    bookingDate: {
        type: Date,
        required: true,
        trim: true
    },
    pending: {
        type: Boolean,
        default: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Booking