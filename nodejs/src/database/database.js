//import entity definitions + connection to db
const entity = require('./database-schema');


//ALL CREATION METHODS
//push new user to database
let createUser = function(userInfo) {
    let user = new entity.user(userInfo);//JSON.parse(userInfo));
    user.save()
        .then(()=>{
            console.log(user);
        }).catch((err)=>{
            console.log(err)
        });
};

//push new charger to database
let createCharger = function(chargerInfo) {
    let charger = new entity.charger(chargerInfo);//JSON.parse(userInfo));
    charger.save()
        .then(()=>{
            console.log(charger);
            // //create new marker for charger in database
            // let marker = new entity.marker({

            // });
        }).catch((err)=>{
            console.log(err)
        });
};

//push new booking to pending bookings
let createBooking = function(bookingInfo) {
    let booking = new entity.pendingBooking(bookingInfo);//JSON.parse(userInfo));
    booking.save()
        .then(()=>{
            console.log(booking);
        }).catch((err)=>{
            console.log(err)
        });
};

//push new review to review bank
let createReview = function(reviewInfo) {
    let review = new entity.review(reviewInfo);//JSON.parse(userInfo));
    review.save()
        .then(()=>{
            console.log(review);
        }).catch((err)=>{
            console.log(err)
        });
};

//USER FUNCTIONS
//--details
//get user profile
let getUser = function(uUID, callback) {
    // console.log(uUID);
    entity.User.findById(uUID, (err, user)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(user)
        callback(null, user);
    });
};

//--bookings
//get user's pending bookings
let getPendingBookings = function(uUID, callback) {
    entity.pendingBooking.find({user: uUID}, (err, pendingBookings)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(pendingBookings);
        callback(null, pendingBookings);
    });
};
//get user's confirmed and unpaid bookings (should take action on these ones!
let getUnpaidBookings = function(uUID, callback) {
    entity.unpaidBookings.find({user: uUID}, (err, UnpaidBookings)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(UnpaidBookings)
        callback(null, UnpaidBookings);
    });
};
//get user's confirmed and paid bookings
let getPaidBookings = function(uUID, callback) {
    entity.paidBookings.find({user: uUID}, (err, PaidBookings)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(PaidBookings)
        callback(null, PaidBookings);
    });
};
//get user's booking history
let getUserHistory = function(uUID, callback) {
    entity.BookingHistory.find({user: uUID}, (err, BookingHistory)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(BookingHistory)
        callback(null, BookingHistory);
    });
};

//--reviews
//get reviews of the user
let getAllUserReviews = function(uUID, callback) {
    entity.Review.find({reviewee: uUID}, (err, Reviews)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(Reviews)
        callback(null, Reviews);
    });
};

//HOST Functions
//-- get all; connect user to their chargers
//get user's chargers
let getUserChargers = function(uUID, callback) {
    var output;
    let chargers = entity.Charger.find({owner: uUID}, (err, Chargers)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(Chargers)
        // return Chargers;
        // output = Chargers;
        // console.log(output);
        callback(Chargers);
    });
};

//-- pending booking functionality (has action)
//get charger's pending bookings
let getChargerPending = function(cUID, callback) {
    entity.pendingBooking.find({charger: cUID}, (err, pendingBookings)=>{
        if(err)
            return console.log("Error cannot find User: " + uUID + ".");
        // console.log(pendingBookings);
        // return pendingBookings;
        callback(null,pendingBookings);
    });
};
//get all of user's bookings pending their confirmation (ie. all charger requests)
let getAllChargerPending = function(uUID, callback){
    let AllPending = [];
    entity.Charger.find({owner: uUID}, (err, chargers)=>{
        // console.log(chargers);
        chargers.forEach((charger)=>{
            getChargerPending(charger._id,function(err, pendingBookings){
                if(err){
                    console.log(err);
                }
                AllPending = AllPending.concat(pendingBookings);
                if(chargers.indexOf(charger) == chargers.length-1)
                    callback(null, AllPending);
            });
        });  
    });
};

//-- bookings (no action)
//get charger's paid bookings
let getChargerPaid = function(cUID, callback){
    entity.paidBooking.find({charger: cUID}, (err, paidBookings)=>{
        if(err)
            return console.log("Error cannot find Charger: " + cUID + ".");
        callback(null,paidBookings);
    });
};
//get charger's unpaid bookings
let getChargerUnpaid = function(cUID, callback){
    entity.unpaidBooking.find({charger: cUID}, (err, unpaidBookings)=>{
        if(err)
            return console.log("Error cannot find Charger: " + cUID + ".");
        callback(null,unpaidBookings);
    });
};
//get charger's scheduled/confirmed bookings (unpaid + paid(includes host set unavail times))
let getChargerConfirmed = function(cUID, callback){
    let confirmedBookings = [];
    // entity.paidBooking.find({charger: cUID}, (err, paidBookings)=>{
    //     if(err)
    //         return console.log("Error cannot find Charger: " + cUID + ".");
    //     confirmedBookings = confirmedBookings.concat(paidBookings);
    //     entity.unpaidBooking.find({charger: cUID}, (err, unpaidBookings)=>{
    //         if(err)
    //             return console.log("Error cannot find Charger: " + cUID + ".");
    //         confirmedBookings = confirmedBookings.concat(unpaidBookings);

    //         callback(null, confirmedBookings);
    //     });
    // });
    getChargerPaid(cUID, function(err, paidBookings){
        confirmedBookings = confirmedBookings.concat(paidBookings);
        getChargerUnpaid(cUID, function(err, unpaidBookings){
            confirmedBookings = confirmedBookings.concat(unpaidBookings);
            callback(null, confirmedBookings);
        });
    });
    
};
//get charger's booking history
let getChargerHistory = function(cUID, callback){
    entity.BookingHistory.find({charger: cUID}, (err, BookingHistorys)=>{
        if(err)
            return console.log("Error cannot find Charger: " + cUID + ".");
        callback(null,BookingHistorys);
    });
};

//-- charger availaibility
//get charger's user set unavail times (in paid, under hosts name)
let getChargerAvailability
let getChargerAvailability = function(cUID, callback){
    let cUID = entity.Charger.findById(cUID, (err, charger)=>{
        entity.paidBooking.find({charger:cUID, user: charger.owner}, (err,paidBookings)=>{
            callback(null, paidBookings);
        });
    });
    
}

//--charger reviews
//get charger's reviews
let getChargerReview
//get all of host's charger reviews
let getAllChargerReviews


//BOOKING FUNCTIONALITIES
//-- HOST (charger management)
//confirm a booking (move from pending to unpaid)
//reject a booking (send a notification to user, delete booking from unpaid)
//set unavailable time (create a confirmed booking under host's own name)

//-- USER (booking)
//view host reviews/details
//create a booking (check if time/date ok, push to pending, await host response)
//pay for a booking (move from unpaid to paid collection)

//-- SYSTEM (booking maintenance)
//move all paid/confirmed bookings passed date to history
//delete all unpaid bookings passed date
//delete all pending bookings passed date

//MAP THINGS
//Get all chargers for map population

module.exports = {
    createUser : createUser,
    createBooking : createBooking,
    createCharger : createCharger,
    createReview : createReview,
    getUser : getUser,
    getPendingBookings : getPendingBookings,
    getChargerPending: getChargerPending,
    getAllChargerPending : getAllChargerPending,
    getUserChargers : getUserChargers
};

// const {MongoClient, ObjectID} = require('mongodb');
// const connectionURL ='mongodb://127.0.0.1:27017';
// const databaseName = 'ZapShare';
// let wuviv = new entity.user({
//     firstName : "Vivian",
//     lastName: "Wu"
// });

// wuviv.save()
//     .then(()=>{
//         console.log(wuviv)
//     }).catch((err)=>{
//         console.log(err)
//     });
// let UserModel =  require('./database-schema');//databaseSchema.user;

// let wuviv = new UserModel({
//     firstName : "Vivian",
//     lastName: "Wu"
// })
// MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error,client)=>{
//     if(error){
//         return console.log("Unable to connect to database!")
//     }

//     const db = client.db(databaseName);

//     db.collection('Users').insertOne({
//         wuviv
//     }, (error, result) =>{
//         if(error){
//             return console.log('Unable to insert user');
//         }

//         console.log(result.ops)
//     });
// });