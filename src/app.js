// Imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')
const chargerRouter = require('./routers/charger')
require('./db/mongoose')

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()
const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use(userRouter)
app.use(bookingRouter)
app.use(chargerRouter)

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

app.get('/profile_details', (req, res) => {
    res.render('profile_details', {
        title: 'ZapShare - User Profile',
        name: ''
    })
})

app.get('/host_dashboard', (req, res) => {
    res.render('host_dashboard', {
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

app.get('/about', (req, res) => {
    let wuviv = {
                "firstName": "Vivian",
                "lastName" : "Wu"
            };
    db.createUser(wuviv);
//    console.log(db.getUserChargers("5cd5fbb2eaa7db46388a0860"));
// db.getUserChargers("5cd5fbb2eaa7db46388a0860", function(err, chargers) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(chargers);

// });
// db.getAllChargerPending("5cd5fbb2eaa7db46388a0860", function(err, ChargerPending) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(ChargerPending);

// });
// db.payBooking("5cd620c680e91e04d040851f", function(err, booking){
//     console.log(booking);
// });
// db.getChargerPending("5cd5e014996246647c04cd58", function(err,pending){
//     if(err)
//         console.log(err);
//     console.log(pending);
// });
    // db.getAllChargerPending("5cd5fbb2eaa7db46388a0860");
    // db.getPendingBookings("5cd5de69f8fdd863c8a5e96d");

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

// app.route("/createUser", (req,res) =>{
//     console.log("in create user");
//     let wuviv = {
//         "firstName": "Vivian",
//         "lastName" : "Wu"
//     };

//     db.createUser(wuviv)
// });

// app.listen(4000, () => {
//     console.log('Server is up on port 4000.')
// });

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})