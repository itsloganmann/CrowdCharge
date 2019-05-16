// Imports
const express = require('express')
const Booking = require('../models/booking.js')
const Review = require('../models/review.js')
const Charger = require('../models/charger.js')

const router = new express.Router()
const auth = require('../middleware/auth')


//gets clients PENDING bookings
router.get('/pendingBookings', auth, async(req, res)=>{
    res.send(await getClientBookings(req.user, "PENDING"));
})

//gets clients UNPAID bookings
router.get('/unpaidBookings', auth, async(req, res)=>{
    res.send(await getClientBookings(req.user, "UNPAID"));
})

//gets clients PAID bookings
router.get('/paidBookings', auth, async(req, res)=>{
    res.send(await getClientBookings(req.user, "PAID"));
})

//gets clients COMPLETED bookings
router.get('/completedBookings', auth, async(req, res)=>{
    res.send(await getClientBookings(req.user, "COMPLETED"));
})


//Get client's bookings
// uUID -> [bookings]
router.get('/Reviews', auth, async(req, res)=>{
    try {
        const reviews = await Review.find( {user:req.user} );
        res.send(reviews)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

//Gets client's bookings of given state
let getClientBookings = async function(uUID, state){
    try{
        const bookings = await Booking.find( {client : uUID, state : state} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                const client = await User.findById(booking.client);
                let element ={};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = booking.cost;
                element.address = charger.address;
                element.city = charger.city;
                element.province = charger.province;
                element.client = client.name;
                element.cName = charger.cName;
                if(state =="PENDING")
                    element.bookingID = booking._id;
                // console.log(element)
                return element;
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        return results;
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
}

module.exports = router