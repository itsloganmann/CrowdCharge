// Imports
const express = require('express')
const Review = require('../models/review')
const Charger = require('../models/charger')
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
    const review = new Review(req.body.review)
    review.reviewer=req.user._id
    console.log(review)
    try {
        await review.save()

        if(req.body.type=="CHARGER"){
            let allReviews = await Review.find({reviewee:req.body.review.reviewee})
            let sum=0;
            allReviews.forEach(review=>{
                sum+=review.rating
            })
            let charger = await Charger.findById(review.reviewee);
            let newChargerRating = sum/allReviews.length;
            console.log(newChargerRating)
            charger.rating = newChargerRating
            console.log(charger)
            await charger.save()
        }
        res.status(201).send(review)
    } catch (error) {
        res.status(400).send(error)
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