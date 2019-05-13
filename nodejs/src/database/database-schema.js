//viv's mongodb startup command
// C:\Program Files\MongoDB\Server\4.0\bin .\mongod.exe --dbpath=c:\Users\wuviv\MongoDB-data

//mongoDB object modelling module
const mongoose = require('mongoose');
//database hosting url/location
const connectionURL ='mongodb://127.0.0.1:27017/ZapShare'
// const connectionURL = 'mongodb+srv://admin:zapshare@zapshare-qqjxu.mongodb.net/ZapShare?retryWrites=true'
//connect to database
mongoose.connect(connectionURL,{
    useNewUrlParser :true,
    useCreateIndex: true
});

//user model
const User = mongoose.model('User', {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    email:{
        type: String
    },
    // chargers:{
    //     type: Array,
    //     default: []
    // },
    // reviews: {
    //     type: Array,
    //     default: []
    // },
    // bookings: {
    //     type: Array,
    //     default: []
    // }
    // notifications: {
    //     type: Array,
    //     default: []
    // }
});

//charger model
const Charger = mongoose.model('Charger', {
    owner: {
        type: String
    },
    location: {
        type: String
    },
    rate: {
        type: Number
    },
    type: {
        type: String
    },
    details:{
        type: String
    },
    // reviews:{
    //     type: Array,
    //     default: []
    // },
    // bookings:{
    //     type: Array,
    //     default: []
    // }, 
    // history: {
    //     type: Array,
    //     default: []
    // }
});

//schema for bookings
const bookingSchema = {
    charger: {
        type: String
    },
    user: {
        type: String
    },
    timeStart: {
        type: Date
    },
    timeEnd:{
        type: Date
    }
};

//pending booking model
const pendingBooking = mongoose.model('pendingBooking', bookingSchema);

//unpaid booking model
const unpaidBooking = mongoose.model('unpaidBooking', bookingSchema);

//paid booking model
const paidBooking = mongoose.model('paidBooking', bookingSchema);

//booking history
const BookingHistory = mongoose.model('BookingHistory', bookingSchema);

//review model
const Review = mongoose.model('Review', {
    reviewer: {
        type: String
    },
    reviewee: {
        type: String
    },
    details: {
        type: Number
    },
    rating:{
        type: Number
    },
    date:{
        type: Date
    }
});

//marker model (for map population)
const Marker = mongoose.model('Marker',{
    charger:{
        type: String
    },
    long: {
        type: Number
    },
    lat: {
        type: Number
    }
});

//notification model (to notify user of changes)
const Notification = mongoose.model('Notification',{
    user : {
        type: String
    },
    booking: {
        type: Object
    },
    //notification type (one of: booking recieved, booking declined, booking accepted, booking paid, booking cancelled)
    type: {
        String: String
    },
    read: {
        type: Boolean
    }
});

module.exports ={
    User: User,
    Charger: Charger,
    pendingBooking: pendingBooking,
    unpaidBooking: unpaidBooking,
    paidBooking: paidBooking,
    BookingHistory : BookingHistory,
    Review: Review,
    Marker: Marker,
    Motification: Notification
};