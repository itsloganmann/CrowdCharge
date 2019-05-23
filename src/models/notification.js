const mongoose = require('mongoose')
const validator = require('validator')

// Creates mongoose data model for a notification object and adds validator to data
const Notification = mongoose.model('Notification', {
    //booking ID
    booking: {
        type: Object,
        required: true
    },
    //the user(ID) to be notify
    user: {
        type: String,
        required: true
    },
    //notification type (one of: booking recieved, booking declined, booking accepted, booking paid, booking cancelled)
    type: {
        type: String,
        enum: ['NEWREQ', 'ACCEPTED', 'DECLINED', 'PAID', 'CANCELLED', 'NEWREVIEW'],
        default: 0
    },
    //notification status
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = Notification