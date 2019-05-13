// Imports
const express = require('express')
const Marker = require('../models/marker')
const router = new express.Router()

// GET request endpoint for fetching all markers
router.get('/markers', async (req, res) => {
    try {
        const markers = await Marker.find( {} )
        res.send(markers)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

// GET request endpoint for fetching markers by id
router.get('/markers/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const marker = await Marker.findById(_id)

        // If it doesn't find any matching marker id's, then send back 404
        if (!marker) {
            return res.status(404).send()
        }

        // Send back the matching marker if found
        res.send(marker)
    } catch (error) {
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve marker json object from client
router.post('/markers', async (req, res) => {
    const marker = new Marker(req.body)

    try {
        await marker.save()
        res.status(201).send(marker)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Updates a marker
router.patch('/markers/:id', async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['long', 'lat']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // req.body lets us access the data from front-end. new: true lets us get the updated user back.
        const marker = await Marker.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // If no marker is found.
        if (!marker) {
            return res.status(404).send()
        }

        // Sends back the found marker data back after updating it
        res.send(marker)

    } catch (error) {
        res.status(400).send(error)
    }
})

// Route handler for deleting markers
router.delete('/markers/:id', async (req, res) => {
    try {
        const marker = await Marker.findByIdAndDelete(req.params.id)

        if (!marker) {
            return res.status(404).send()
        }

        res.send(marker)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router