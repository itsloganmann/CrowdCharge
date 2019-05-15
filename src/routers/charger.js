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

module.exports = router