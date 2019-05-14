// Imports
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// REST API for creating resources. Sets up routing for POST requests to retrieve user json object from client
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        // Waits for the promise that comes back when saving.
        await user.save()

        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        // Code only runs here if save is successful, otherwise runs catch code block.
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET request endpoint for fetching all users.
// Sets up auth middleware first before getting data.
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find( {} )
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

// GET request endpoint for fetching own user data. 
// Sets up auth middleware first before getting data.
router.get('/users/me', async (req, res) => {
    res.send(req.user)
})

// GET request endpoint for fetching individual user by ID. Dynamic route handler.
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        // Mongoose automatically converts mongodb string id into object id's
        const user = await User.findById(_id) 

        if (!user) {
            return res.status(404).send()
        }
        // If found, send back the user
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

// Updates a user
router.patch('/users/:id', async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        // // EXAMPLE Below can be used for mongoose to find id and update. req.body lets us access the data from front-end. new: true lets us get the updated user back.
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // Small adjustment required to use middleware. Updates user data.
        updates.forEach((update) => {
            user[update] = req.body[update]
            console.log(user[update])
        })

        await user.save()
        
        // If no user is found.
        if (!user) {
            return res.status(404).send()
        }
        
        // Sends back the found user data back after updating it
        res.send(user)

    } catch (error) {
        console.log('error!')
        res.status(400).send(error)
    }
})

// Route handler for deleting resources
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

// Route handler for users login using email and password, generate an auth token
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router