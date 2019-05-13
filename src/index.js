// Imports
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')
const chargerRouter = require('./routers/charger')
const reviewRouter = require('./routers/review')
const markerRouter = require('./routers/marker')
const notificationRouter = require('./routers/notification')

// Sets up express
const app = express()
const port = process.env.PORT || 3000

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// // Middleware function for maintenance mode. Disables all http requests. 
// app.use((req, res, next) => {
//         res.status(503).send('Site is in maintenance mode, cannot query data.')
// })

// Registers routers, allowing us to refactor routes into separate files
app.use(userRouter)
app.use(bookingRouter)
app.use(chargerRouter)
app.use(reviewRouter)
app.use(markerRouter)
app.use(notificationRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// NOTES: Without middleware: new request -> run route handler
//        With middleware: new request -> do something -> run route handler

// EXAMPLE: jsonwebtoken
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     // Creates a web token based on user id and a secret passphrase
//     const token = jwt.sign({ _id: 'abc123'}, 'zapsharerox', {expiresIn: '7 days'})

//     // Makes sure user is authenticated
//     jwt.verify(token, 'zapsharerox')
// }

// myFunction()

// EXAMPLE: bcryptjs
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()