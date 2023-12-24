const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

//change this to your local database
const local = 'mongodb://localhost:27017'

mongoose.connect(local, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, // Add this line
    useFindAndModify: false
})


const fs = require('fs');

const User = require('../src/models/user.js');
let usersRawdata = fs.readFileSync('./TEST_users.json');
let userJSON = JSON.parse(usersRawdata)

userCollection = userJSON.map(element => {
    element._id = new ObjectId(element._id.$oid);
    element.balance = element.balance.$numberInt;
    element.tokens = []
    delete element.__v
    console.log(element)
    return element
});

User.insertMany(userCollection, function (err, docs) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Multiple documents inserted to Collection");
    }
});

const Review = require('../src/models/review.js');
let reviewsRawdata = fs.readFileSync('./TEST_reviews.json');
let reviewJSON = JSON.parse(reviewsRawdata)

reviewCollection = reviewJSON.map(element => {
    element._id = new ObjectId(element._id.$oid);
    element.rating = element.rating.$numberInt;
    if (element.rating == null)
        element.rating = element.rating.$numberDouble;
    element.date = element.date.$date.$numberLong;
    delete element.__v
    console.log(element)
    return element
});

Review.insertMany(reviewCollection, function (err, docs) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Multiple documents inserted to Collection");
    }
});

