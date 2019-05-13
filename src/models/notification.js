const mongoose = require('mongoose')
const validator = require('validator')

// Creates mongoose data model for a notification object and adds validator to data
const Notification = mongoose.model('Notification', {
    charger: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    //notification type (one of: booking recieved, booking declined, booking accepted, booking paid, booking cancelled)
    type: {
        String: String
    },
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = Notification