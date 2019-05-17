// Imports
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')
const chargerRouter = require('./routers/charger')
const pagesRouter = require('./routers/pages')
const clientRouter = require('./routers/client')
const markerRouter = require('./routers/marker')
const hostRouter = require('./routers/host')
const hbs = require('hbs')
require('./db/mongoose')

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()

// Setup static directory to-serve. Customizes the server, pass in the path that we want to serve, the public folder 
const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))

// Takes a path to the directory for hbs partials.
hbs.registerPartials(partialsPath)

// Get handlebars set up to create dynamic templates.
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use('/client',clientRouter);
app.use('/host',hostRouter)
app.use(userRouter)
app.use('/booking',bookingRouter)
app.use(chargerRouter)
app.use(markerRouter);


// Page router, do not move order, needs to come last.
app.use(pagesRouter)

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})