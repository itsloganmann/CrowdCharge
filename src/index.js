// Imports
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')
const chargerRouter = require('./routers/charger')
const reviewRouter = require('./routers/review')

// Sets up express
const app = express()
const port = process.env.PORT || 3000

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Registers routers, allowing us to refactor routes into separate files
app.use(userRouter)
app.use(bookingRouter)
app.use(chargerRouter)
app.use(reviewRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()