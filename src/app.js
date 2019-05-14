// Imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

//the database
// const db = require('./database/database')
const mongoose = require('./db/mongooseInit')

const clientRouter = require('./routers/client')



// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()
const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Get handlebars set up to create dynamic templates.
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Takes a path to the directory for hbs partials.
hbs.registerPartials(partialsPath)

// Setup static directory to-serve. Customizes the server, pass in the path that we want to serve, the public folder 
app.use(express.static(publicDirectoryPath))

app.use('/client',clientRouter);

// Setting up the routing for different pages.
app.get('', (req, res) => {
    res.render('index', {
        title: 'ZapShare - Peer-to-peer Electric Vehicle Charging Network',
        name: 'Home'
    })
}) 

// Demonstrates a use for local API modules and how to get data from call back functions.
app.get('/weather', (req, res) => {
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

app.get('/user_profile', (req, res) => {
    res.render('user_profile', {
        title: 'ZapShare - User Profile',
        name: ''
    })
})

app.get('/host_setting', (req, res) => {
    res.render('host_setting', {
        title: 'ZapShare - Host Settings',
        name: ''
    })
})

app.get('/add_new_charger', (req, res) => {
    res.render('add_new_charger', {
        title: 'ZapShare - Add a Charger',
        name: ''
    })
})

app.get('/user_setting', (req, res) => {
    res.render('user_setting', {
        title: 'ZapShare - User Settings',
        name: ''
    })
})

app.get('/wallet', (req, res) => {
    res.render('wallet', {
        title: 'ZapShare - Wallet',
        name: ''
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'ZapShare - Contact',
        name: ''
    })
})
app.get('/index', (req, res) => {
    res.render('index', {
        title: 'ZapShare - Peer-to-peer Electric Charging Network',
        name: ''
    })
})

app.get('/notification', (req, res) => {
    res.render('notification', {
        title: 'ZapShare - Notification',
        name: ''
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ZapShare - About',
        name: ''
    })
})

app.get('/map', (req, res) => {
    res.render('map', {
        title: 'ZapShare - Map',
        name: ''
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        message: 'Help page contents.',
        title: 'Help',
        name: ''
    })
})

app.get('/help/*', (req, res) => {
    
    res.render('404', {
        title: 'Help',
        name: '',
        errorMessage: 'Help article not found.'
    })
})

// Handles 404 not found.
app.get('*', (req, res) => {
    res.render('404', {
        title: 'ZapShare - 404 Page Not Found',
        name: '',
        errorMessage: 'Page not found.'
    })
})

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

