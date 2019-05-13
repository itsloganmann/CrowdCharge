// Imports
const express = require('express')
const Review = require('../models/review')
const router = new express.Router()

// GET request endpoint for fetching all bookings
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find( {} )
        res.send(reviews)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve review json object from client
router.post('/reviews', async (req, res) => {
    const review = new Review(req.body)

    try {
        await review.save()
        res.status(201).send(review)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router