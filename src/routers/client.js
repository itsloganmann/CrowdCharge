// Imports
const express = require('express')
const Booking = require('../models/booking.js')
const Review = require('../models/review.js')
const Charger = require('../models/charger.js')

const router = new express.Router()
const auth = require('../middleware/auth')

//Get client's pending bookings
router.get('/pendingBookings', async(req, res)=>{
    try{
        //const responseBookings= [];
        const bookings = await Booking.find( {user:"5cd9f080c546a50b142d6ef1", state: "PENDING"} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                let element ={};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = (charger.rate*(booking.timeEnd-booking.timeStart)*2.777e-7).toFixed(2);
                element.address = charger.address;
                element.city = charger.city;
                // responseBookings.push(element);
                // console.log(element); 
                return element;
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        console.log(results)
        res.send(results);
    }catch(error){
        console.log(error);
        res.status(500).send();
}})

//Get client's pending bookings
router.get('/unpaidBookings', async(req, res)=>{
    try{
        //const responseBookings= [];
        const bookings = await Booking.find( {user:"5cd9f080c546a50b142d6ef1", state: "UNPAID"} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                let element ={};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = (charger.rate*(booking.timeEnd-booking.timeStart)*2.777e-7).toFixed(2);
                element.address = charger.location;
                //element.city = 
                // responseBookings.push(element);
                // console.log(element); 
                return element;
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        res.send(results);
    }catch(error){
        console.log(error);
        res.status(500).send();
}})

//Get client's pending bookings
router.get('/paidBookings', async(req, res)=>{
    try{
        //const responseBookings= [];
        const bookings = await Booking.find( {user:"5cd9f080c546a50b142d6ef1", state: "PAID"} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                let element ={};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = (charger.rate*(booking.timeEnd-booking.timeStart)*2.777e-7).toFixed(2);
                element.address = charger.location;
                //element.city = 
                // responseBookings.push(element);
                // console.log(element); 
                return element;
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        res.send(results);
    }catch(error){
        console.log(error);
        res.status(500).send();
}})

//Get client's pending bookings
router.get('/paidBookings', async(req, res)=>{
    try{
        //const responseBookings= [];
        const bookings = await Booking.find( {user:"5cd9f080c546a50b142d6ef1", state: "COMPLETED"} );
        var promises = bookings.map(async booking=>{
            try{
                const charger = await Charger.findById(booking.charger);
                let element ={};
                element.startTime = booking.timeStart;
                element.endTime = booking.timeEnd;
                element.cost = (charger.rate*(booking.timeEnd-booking.timeStart)*2.777e-7).toFixed(2);
                element.address = charger.location;
                //element.city = 
                // responseBookings.push(element);
                // console.log(element); 
                return element;
            }catch(error){
                console.log(error)
            }
        });
        const results = await Promise.all(promises)
        res.send(results);
    }catch(error){
        console.log(error);
        res.status(500).send();
}})


//Get client's bookings
// uUID -> [bookings]
router.get('/Reviews', auth, async(req, res)=>{
    try {
        const reviews = await Review.find( {user:req.uUID} )
        res.send(reviews)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

module.exports = router