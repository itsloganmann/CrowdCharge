// Imports
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Booking = require('./models/booking')
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')

// Sets up express
const app = express()
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use(userRouter)
app.use(bookingRouter)

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})