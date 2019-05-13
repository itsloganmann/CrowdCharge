// Imports
const express = require('express')
const Notification = require('../models/notification')
const router = new express.Router()

// GET request endpoint for fetching all notifications
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find( {} )
        res.send(notifications)
    } catch (error) {
        // Sets up internal server error code. Database went wrong.
        res.status(500).send()
    }
})

// GET request endpoint for fetching notifications by id
router.get('/notifications/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const notification = await Notification.findById(_id)

        // If it doesn't find any matching notification id's, then send back 404
        if (!notification) {
            return res.status(404).send()
        }

        // Send back the matching notification if found
        res.send(notification)
    } catch (error) {
        res.status(500).send()
    }
})

// REST API for creating resources. Sets up routing for POST requests to retrieve notification json object from client
router.post('/notifications', async (req, res) => {
    const notification = new Notification(req.body)

    try {
        await notification.save()
        res.status(201).send(notification)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Updates a notification
router.patch('/notifications/:id', async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['read']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // req.body lets us access the data from front-end. new: true lets us get the updated user back.
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // If no notification is found.
        if (!notification) {
            return res.status(404).send()
        }

        // Sends back the found notification data back after updating it
        res.send(notification)

    } catch (error) {
        res.status(400).send(error)
    }
})

// Route handler for deleting notifications
router.delete('/notifications/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id)

        if (!notification) {
            return res.status(404).send()
        }

        res.send(notification)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router