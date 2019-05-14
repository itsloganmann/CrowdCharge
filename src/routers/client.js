// Imports
const express = require('express')
const Booking = require('../models/booking.js')
const Review = require('../models/review.js')
const Charger = require('../models/charger.js')

const router = new express.Router()
const auth = require('../middleware/auth')


// //Get user's profile
// // uUID -> User
// router.get('/client/me', auth, async (req, res)=>{
//    req.user;
// })

//Get client's bookings
//uUID, bookingType -> [bookings]
router.get('/bookings', async(req, res)=>{
    // try {
    //     const responseJSON= {};
    //     const bookings = await Booking.find( {user:req.uUID, type: req.bookingType} );
    //     bookings.array.forEach(booking => {
            
            
    //     });
    //     res.send(bookings)
    // } catch (error) {
    //     // Sets up internal server error code. Database went wrong.
    //     res.status(500).send()
    // }
    console.log("we in");
    console.log(req.data);
    res.send(req.data);
})

router.get('/client/Bookingss', async(req, res)=>{
    try {
        const responseJSON= {};
        const bookings = await Booking.find( {user:req.uUID, type: req.bookingType} );
        bookings.array.forEach(booking => {
            
            
        });
        res.send(bookings)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
    // console.log(req.data);
})

//Get client's bookings
// uUID -> [bookings]
router.get('/client/Reviews', auth, async(req, res)=>{
    try {
        const reviews = await Review.find( {user:req.uUID} )
        res.send(reviews)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

module.exports = router