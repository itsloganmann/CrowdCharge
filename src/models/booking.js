const mongoose = require('mongoose')
const validator = require('validator')

const Booking = mongoose.model('Booking', {
    //charger ID
    charger: {
        type: String,
        required: true,
        trim: true
    },
    //Client ID
    client: {
        type: String,
        required: true,
        trim: true
    },
    timeStart: {
        type: Date,
        required: true,
        trim: true,
        validate(value) {
            const startDate = new Date(value)
            const convertedStartDate = startDate.getTime()
            const currentDate = new Date()
            const convertedCurrentDate = currentDate.getTime()

            // Validation for booking start time
            if (convertedStartDate < convertedCurrentDate) {
                throw new Error('Cannot book a past date.')
            }
        }
    },
    timeEnd: {
        type: Date,
        required: true,
        trim: true,
        validate(value) {
            const startDate = new Date(value)
            const convertedStartDate = startDate.getTime()
            const currentDate = new Date()
            const convertedCurrentDate = currentDate.getTime()

            // Validation for booking start time
            if (convertedStartDate < convertedCurrentDate) {
                throw new Error('Cannot book a past date.')
            }
        }
    },
    cost: {
        type: Number,
        required: true,
        trim: true
    },
    //4 states: PENDING, UNPAID, PAID, COMPLETED
    state: {
        type: String,
        default: 'PENDING'
    },
    chargerReview: {
        type: String,
        required: false
    },
    userFeedback: {
        type: String,
        required: false
    }
})

module.exports = Booking;