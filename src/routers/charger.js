// Imports
const express = require('express')
const Charger = require('../models/charger')
const auth = require('../middleware/auth')
const router = new express.Router()
const auth = require('../middleware/auth')

// GET request endpoint for fetching all chargers
router.get('/chargers', auth, async (req, res) => {
    try {
        const chargers = await Charger.find( {} )
        res.send(chargers)
    } catch (error) {
        //Send back error code
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve charger json object from client
router.post('/chargers', auth, async (req, res) => {
    const charger = new Charger(req.body)
    charger.owner = req.user
    
    try {
        console.log(req.body)
        await charger.save()
        res.status(201).send(charger)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET request endpoint for fetching charger by id
router.get('/chargers/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const charger = await Charger.findById(_id)

        // If it doesn't find any matching booking id's, then send back 404
        if (!charger) {
            return res.status(404).send()
        }

        // Send back the matching booking if found
        res.send(charger)
    } catch (error) {
        res.status(500).send()
    }
})

// Updates a charger
router.patch('/chargers/:id', auth, async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['rate', 'type', 'details']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // req.body lets us access the data from front-end. new: true lets us get the updated user back.
        const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // If no booking is found.
        if (!charger) {
            return res.status(404).send()
        }

        // Sends back the found booking data back after updating it
        res.send(booking)

    } catch (error) {
        res.status(400).send(error)
    }
})

// Route handler for deleting chargers
router.delete('/chargers/:id', auth, async (req, res) => {
    try {
        const charger = await Charger.findByIdAndDelete(req.params.id)

        if (!charger) {
            return res.status(404).send()
        }

        res.send(charger)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router