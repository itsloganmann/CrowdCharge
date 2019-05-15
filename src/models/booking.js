const mongoose = require('mongoose')
const validator = require('validator')

const Booking = mongoose.model('Booking', {
    charger: {
        type: String,
        required: true,
        trim: true
    },
    user: {
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
    
    state: {
        type: String,
        enum : ['PENDING','UNPAID','PAID','COMPLETED'],
        default: 0
    }
})

module.exports = Booking;