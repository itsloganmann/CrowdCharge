// Imports
const express = require('express')
const Review = require('../models/review')
const router = new express.Router()
const auth = require('../middleware/auth')

// GET request endpoint for fetching all bookings
router.get('/reviews', auth, async (req, res) => {
    try {
        const reviews = await Review.find( {} )
        res.send(reviews)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve review json object from client
router.post('/reviews', auth, async (req, res) => {
    const review = new Review(req.body)

    try {
        await review.save()
        res.status(201).send(review)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET request endpoint for fetching review by id
router.get('/reviews/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const review = await Review.findById(_id)

        // If it doesn't find any matching review id's, then send back 404
        if (!review) {
            return res.status(404).send()
        }

        // Send back the matching review if found
        res.send(review)
    } catch (error) {
        res.status(500).send()
    }
})

// Updates a review
router.patch('/reviews/:id', auth, async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['details', 'rating']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // req.body lets us access the data from front-end. new: true lets us get the updated user back.
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // If no review is found.
        if (!review) {
            return res.status(404).send()
        }

        // Sends back the found review data back after updating it
        res.send(review)

    } catch (error) {
        res.status(400).send(error)
    }
})

// Route handler for deleting reviews
router.delete('/reviews/:id', auth, async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)

        if (!review) {
            return res.status(404).send()
        }

        res.send(review)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router