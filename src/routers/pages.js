// Imports
const express = require('express')
const router = new express.Router()

const geocode = require ('../utils/geocode')

// Setting up the routing for different pages.
router.get('', (req, res) => {
    res.render('index', {
        title: 'CrowdCharge - Peer-to-peer Electric Vehicle Charging Network'
    })
})

router.get('/index', (req, res) => {
    res.render('index', {
        title: 'CrowdCharge - Peer-to-peer Electric Vehicle Charging Network'
    })
})

router.get('/profile_details', (req, res) => {
    res.render('profile_details', {
        title: 'CrowdCharge - Your Profile'
    })
})

router.get('/change_password', (req, res) => {
    res.render('change_password', {
        title: 'CrowdCharge - Change Password'
    })
})

router.get('/charger_dashboard', (req, res) => {
    res.render('charger_dashboard', {
        title: 'CrowdCharge - Charger Dashboard'
    })
})

router.get('/charger_requests', (req, res) => {
    res.render('charger_requests', {
        title: 'CrowdCharge - Charger Requests'
    })
})

router.get('/charger_bookings', (req, res) => {
    res.render('charger_bookings', {
        title: 'CrowdCharge - Charger Bookings'
    })
})

router.get('/charger_reviews', (req, res) => {
    res.render('charger_reviews', {
        title: 'CrowdCharge - Charger Reviews'
    })
})

router.get('/charger_history', (req, res) => {
    res.render('charger_history', {
        title: 'CrowdCharge - Charger History'
    })
})

router.get('/user_bookings', (req, res) => {
    res.render('user_bookings', {
        title: 'CrowdCharge - User Bookings'
    })
})

router.get('/user_payments', (req, res) => {
    res.render('user_payments', {
        title: 'CrowdCharge - User Payments'
    })
})

router.get('/user_feedback', (req, res) => {
    res.render('user_feedback', {
        title: 'CrowdCharge - User Feedback'
    })
})

router.get('/user_history', (req, res) => {
    res.render('user_history', {
        title: 'CrowdCharge - User History'
    })
})

router.get('/wallet', (req, res) => {
    res.render('wallet', {
        title: 'CrowdCharge - Your Wallet'
    })
})

router.get('/recharge', (req, res) => {
    res.render('recharge', {
        title: 'CrowdCharge - Recharge'
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'CrowdCharge - Contact Us'
    })
})

router.get('/notification', (req, res) => {
    res.render('notification', {
        title: 'CrowdCharge - Notifications'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'CrowdCharge - About Us'
    })
})

router.get('/map', (req, res) => {
    res.render('map', {
        title: 'CrowdCharge - Map'
    })
})

router.get('/privacy', (req, res) => {
    res.render('privacy', {
        title: 'CrowdCharge - Privacy Policy'
    })
})

router.get('/disclaimer', (req, res) => {
    res.render('disclaimer', {
        title: 'CrowdCharge - Disclaimer'
    })
})

router.get('/terms', (req, res) => {
    res.render('terms', {
        title: 'CrowdCharge - Terms of Service'
    })
})

router.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'CrowdCharge - FAQ'
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
    geocode(decodeURIComponent(req.query.address), (error, { latitude, longitude } = {}) => {
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
        title: 'CrowdCharge - 404 Page Not Found',
        name: '',
        errorMessage: 'Page not found.'
    })
})

module.exports = router