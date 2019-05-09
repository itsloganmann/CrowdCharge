const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()
const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Get handlebars set up to create dynamic templates.
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Takes a path to the directory for hbs partials.
hbs.registerPartials(partialsPath)

// Setup static directory to-serve. Customizes the server, pass in the path that we want to serve, the public folder 
app.use(express.static(publicDirectoryPath))

// Setting up the routing for different pages.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Edwin'
    })
}) 

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

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        product: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Edwin'
    })
})

app.get('/map', (req, res) => {
    res.render('map', {
        title: 'Map',
        name: 'Edwin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message for help',
        title: 'Help',
        name: 'Edwin'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Edwin Pau',
        errorMessage: 'Help article not found.'
    })
})

// Handles 404 not found.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Edwin Pau',
        errorMessage: 'Page not found.'
    })
})

// Starts up the web server.
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})