// Imports
const express = require('express')
const router = new express.Router()
const geocode = require ('../utils/geocode')
const forecast = require ('../utils/forecast')

// Setting up the routing for different pages.
router.get('', (req, res) => {
    res.render('index', {
        title: 'ZapShare - Peer-to-peer Electric Vehicle Charging Network',
        name: 'Home'
    })
}) 

router.get('/profile_details', (req, res) => {
    res.render('profile_details', {
        title: 'ZapShare - User Profile',
        name: ''
    })
})

router.get('/host_dashboard', (req, res) => {
    res.render('host_dashboard', {
        title: 'ZapShare - Host Settings',
        name: ''
    })
})

router.get('/add_new_charger', (req, res) => {
    res.render('add_new_charger', {
        title: 'ZapShare - Add a Charger',
        name: ''
    })
})

router.get('/client_dashboard', (req, res) => {
    res.render('client_dashboard', {
        title: 'ZapShare - User Settings',
        name: ''
    })
})

router.get('/wallet', (req, res) => {
    res.render('wallet', {
        title: 'ZapShare - Wallet',
        name: ''
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'ZapShare - Contact',
        name: ''
    })
})
router.get('/index', (req, res) => {
    res.render('index', {
        title: 'ZapShare - Peer-to-peer Electric Charging Network',
        name: ''
    })
})

router.get('/notification', (req, res) => {
    res.render('notification', {
        title: 'ZapShare - Notification',
        name: ''
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'ZapShare - About',
        name: ''
    })
})

router.get('/map', (req, res) => {
    res.render('map', {
        title: 'ZapShare - Map',
        name: ''
    })
})

router.get('/help', (req, res) => {
    res.render('Help', {
        message: 'Help page contents.',
        title: 'Help',
        name: ''
    })
})

router.get('/help/*', (req, res) => {
    
    res.render('404', {
        title: 'Help',
        name: '',
        errorMessage: 'Help article not found.'
    })
})

// Demonstrates a use for local API modules and how to get data from call back functions.
router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // Added = {} to give it a default object so the app doesn't crash when there is an error.
    geocode(decodeURIComponent(req.query.address), (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Demonstrates a use for local API modules and how to get data from call back functions.
router.get('/address', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // Added = {} to give it a default object so the app doesn't crash when there is an error.
    geocode(decodeURIComponent(req.query.address), (error, { latitude, longitude} = {}) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            address: req.query.address,
            coordinates: [latitude, longitude]
        })
    })
})

// Handles 404 not found.
router.get('*', (req, res) => {
    res.render('404', {
        title: 'ZapShare - 404 Page Not Found',
        name: '',
        errorMessage: 'Page not found.'
    })
})

module.exports = router