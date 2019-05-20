// Imports
const express = require('express')
const Booking = require('../models/booking.js')
const Review = require('../models/review.js')
const User = require('../models/user.js')
const Charger = require('../models/charger.js')

const router = new express.Router()
const auth = require('../middleware/auth')

//Gets all of owners's charger's pending bookings
// uUID (from auth) -> [booking]
router.get('/pendingBookings', auth, async(req, res)=>{
   res.send(await getHostBookings(req.user._id, "PENDING"))
})

//Gets all of owners's charger's unpaid bookings
// uUID (from auth) -> [booking]
router.get('/unpaidBookings', auth, async(req, res)=>{
    res.send(await getHostBookings(req.user._id, "UNPAID"));
 })

 //Gets all of owners's charger's paid bookings
// uUID (from auth) -> [booking]
 router.get('/paidBookings', auth, async(req, res)=>{
    res.send(await getHostBookings(req.user._id, "PAID"));
 })


//Gets all of owners's charger's completed bookings
// uUID (from auth) -> [booking]
 router.get('/completedBookings', auth, async(req, res)=>{
   res.send(await getHostBookings(req.user._id, "COMPLETED"));
})

//Gets charger's pending bookings
// cUID -> [booking]
router.get('/pendingChargerBookings', async(req,res)=>{
    res.send(await getChargerBookings( req.cUID,"PENDING"));
})

//Gets charger's unpaid bookings
// cUID -> [booking]
router.get('/unpaidChargerBookings', async(req,res)=>{
    res.send(await getChargerBookings(req.cUID,"UNPAID"));
})

//Gets charger's paid bookings
// cUID -> [booking]
router.get('/paidChargerBookings', async(req,res)=>{
    res.send(await getChargerBookings(req.cUID,"PAID"));
})

//Gets charger's completed bookings
// cUID -> [booking]
router.get('/completedChargerBookings', async(req,res)=>{
    res.send(await getChargerBookings(req.query.cUID,"COMPLETED"));
})

router.get('/chargerReviews', async(req,res)=>{
   res.send(await getChargerReviews(req.query.cUID));
})

router.get('/allChargerReviews', async(req,res)=>{
    try{
        const chargers = await Charger.find({owner: req.user});
        var promises = chargers.map(async(charger)=>{return await getChargerReviews(charger._id,state)});
        const results = await Promise.all(promises)
        var merged = [].concat.apply([], results);
        return(merged);
    }catch(error){
        console.log(error)
    }
})

let getChargerReviews = async function(cUID){
    try{
        const reviews = await reviews.find({reviewee:cUID});
        return reviews;
    }catch(error){
        console.log(error)
        res.send("Error, could not get reviews")
    }
}

//Gets owners(uUID)'s charger's bookings of state as an array
let getHostBookings = async function(uUID, state){
    console.log(uUID, state);
    try{
        const chargers = await Charger.find({owner: uUID});
        var promises = chargers.map(async(charger)=>{return await getChargerBookings(charger._id,state)});
        const results = await Promise.all(promises)
        var merged = [].concat.apply([], results);
        console.log("Merged ", merged);
        return(merged);
    }catch(error){
        console.log(error)
    }
}

//Gets charger(cUID)'s bookings of state as an array
let getChargerBookings = async function(cUID,state){
    try{
        const bookings = await Booking.find( {charger : cUID, state : state} );
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
                element.chargername = charger.chargername;
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
