const mongoose = require('mongoose');
const connectionURL ='mongodb://127.0.0.1:27017/ZapShare'

mongoose.connect(connectionURL,{
    useNewUrlParser :true,
    useCreateIndex: true
});

const bookingSchema = {
    charger: {
        type: String
    },
    user: {
        type: String
    },
    timeStart: {
        type: Number
    },
    timeEnd:{
        type: Number
    },
    date:{
        type: Date
    }
};

const pendingBooking = mongoose.model('pendingBooking', bookingSchema);

const unpaidBooking = mongoose.model('unpaidBooking', bookingSchema);

const paidBooking = mongoose.model('paidBooking', bookingSchema);

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
    notifications: {
        type: Array,
        default: []
    }
});

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
    reviews:{
        type: Array,
        default: []
    },
    bookings:{
        type: Array,
        default: []
    }, 
    history: {
        type: Array,
        default: []
    }
});

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

module.exports ={
    user: User,
    charger: Charger,
    pendingBooking: pendingBooking,
    unpaidBooking: unpaidBooking,
    paidBooking: paidBooking,
    review: Review,
    marker: Marker
};