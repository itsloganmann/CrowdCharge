// Imports
const express = require('express')
const Booking = require('../models/booking')
const Charger = require('../models/charger')
const Notification = require('../models/notification')
const router = new express.Router()
const auth = require('../middleware/auth')


// Creates a new booking from booking information
router.post('/newBooking', auth, async (req, res) => {
    const booking = new Booking(req.body)
    try {
        let charger = await Charger.findById(booking.charger);
        booking.cost = (charger.cost*(booking.timeEnd-booking.timeStart)*2.777e-7).toFixed(2);
        await booking.save()

        let notification = new Notification({
            booking : booking,
            user : charger.owner,
            type : 'NEWREQ',
            read : false
        })
        await notification.save()
        res.send("successfully requested booking");

        res.status(201).send(booking)
    } catch (error) {
        res.status(400).send(error)
    }
})
//Accepts a booking
router.post('/acceptBooking', auth, async (req,res) =>{
    try{
        const booking = await Booking.findByIdAndUpdate(req.bUID,{state: "UNPAID"});
        let notification = new Notification({
            booking : booking,
            user : booking.client,
            type : 'ACCEPTED',
            read : false
        })
        await notification.save()
        res.send("successfully accepted booking");
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})
//Declines a booking
router.delete('/declineBooking', async (req,res) =>{
    try {
        const booking = await Booking.findByIdAndRemove(req.bUID);
        if (!booking) {
            console.log("Booking not found, could not delete.")
            return res.status(404).send()
        }else{
            let notification = new Notification({
                booking : booking,
                user : booking.client,
                type : 'DECLINED',
                read : false
            })
            await notification.save()
            res.send("successfully declined booking");
        }
        res.send(booking)
    } catch (error) {
        res.status(500).send()
    }
})

// Updates a booking
router.patch('/bookings/:id', auth, async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['accepted']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // req.body lets us access the data from front-end. new: true lets us get the updated user back.
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // If no booking is found.
        if (!booking) {
            return res.status(404).send()
        }

        // Sends back the found booking data back after updating it
        res.send(booking)

    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router