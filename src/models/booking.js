const mongoose = require('mongoose')
const validator = require('validator')


// Creates mongoose data model for a booking object and adds validator to data
const Booking = mongoose.model('Booking', {
    bookingDate: {
        type: Date,
        required: true,
        trim: true
    },
    accepted: {
        type: Boolean,
        default: false
    }
})

module.exports = Booking