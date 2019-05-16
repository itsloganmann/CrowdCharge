// Imports
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// POST request endpoint for creating a new user.
router.post('/users/signup', async (req, res) => {
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

// Route handler for users login using email and password, generate an auth token
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })        
    } catch (error) {
        res.status(400).send({"error" : "" + error});
    }
})

// Route handler for users logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // Checks if the token is the same and removes it if it is
            return token.token !== req.token
        })
        // Saves user profile after removing tokens
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// Route handler for logging out all users (destroys all web tokens)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// GET request endpoint for fetching all users.
// Sets up auth middleware first before getting data.
router.get('/users', async (req, res) => {
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

// Updates a user's own profile
router.patch('/users/me', auth, async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Checks if the update is valid operation
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // Small adjustment required to use middleware. Updates user data.
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // Sends back the found user data back after updating it
        res.send(req.user)

    } catch (error) {
        console.log('error!')
        res.status(400).send(error)
    }
})

// Route handler for deleting own profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router