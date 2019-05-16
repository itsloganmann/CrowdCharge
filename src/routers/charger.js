// Imports
const express = require('express')
const Charger = require('../models/charger')
const auth = require('../middleware/auth')
const router = new express.Router()

// GET request endpoint for fetching all chargers
router.get('/chargers', async (req, res) => {
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

// Updates a charger's own profile
router.patch('/chargers', async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address', 'city', 'type','rate' , 'details']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Checks if the update is valid operation
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // Small adjustment required to use middleware. Updates charger data.
        updates.forEach((update) => {
            req.charger[update] = req.body[update]
        })

        await req.charger.save()

        // Sends back the found charger data back after updating it
        res.send(req.charger)

    } catch (error) {
        console.log('error!')
        res.status(400).send(error)
    }
})
module.exports = router