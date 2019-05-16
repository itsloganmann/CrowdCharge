// Imports
const express = require('express')
const Booking = require('../models/booking')
const router = new express.Router()
const auth = require('../middleware/auth')

// GET request endpoint for fetching all bookings
router.get('/bookings', auth, async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const booking_type = req.query.booking_type;
        console.log(user_id + booking_type);

        const bookings = await Booking.find( {} )
        res.send(bookings)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

// GET request endpoint for fetching booking by id
router.get('/bookings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const booking = await Booking.findById(_id)

        // If it doesn't find any matching booking id's, then send back 404
        if (!booking) {
            return res.status(404).send()
        }

        // Send back the matching booking if found
        res.send(booking)
    } catch (error) {
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve booking json object from client
router.post('/bookings', auth, async (req, res) => {
    const booking = new Booking(req.body)

    try {
        await booking.save()
        res.status(201).send(booking)
    } catch (error) {
        res.status(400).send(error)
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

// Route handler for deleting bookings
router.delete('/bookings/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)

        if (!booking) {
            return res.status(404).send()
        }

        res.send(booking)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router