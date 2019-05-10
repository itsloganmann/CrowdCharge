// const {MongoClient, ObjectID} = require('mongodb');
const entity = require('./database-schema');

// const connectionURL ='mongodb://127.0.0.1:27017';
// const databaseName = 'ZapShare';

let createUser = function(userInfo) {
    let user = new entity.user(userInfo);//JSON.parse(userInfo));
    user.save()
        .then(()=>{
            console.log(user);
        }).catch((err)=>{
            console.log(err)
        });
};

let createCharger = function(chargerInfo) {
    let charger = new entity.charger(chargerInfo);//JSON.parse(userInfo));
    charger.save()
        .then(()=>{
            console.log(charger);
            let marker = new entity.marker({

            });
        }).catch((err)=>{
            console.log(err)
        });
};

let createBooking = function(bookingInfo) {
    let booking = new entity.pendingBooking(bookingInfo);//JSON.parse(userInfo));
    booking.save()
        .then(()=>{
            console.log(booking);
        }).catch((err)=>{
            console.log(err)
        });
};

let createReview = function(reviewInfo) {
    let review = new entity.review(reviewInfo);//JSON.parse(userInfo));
    review.save()
        .then(()=>{
            console.log(review);
        }).catch((err)=>{
            console.log(err)
        });
};

module.exports = {
    createUser : createUser,
    createBooking : createBooking,
    createCharger : createCharger,
    createReview : createReview
};
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