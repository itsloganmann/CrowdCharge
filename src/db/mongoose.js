// Imports
const mongoose = require('mongoose')

// Variables for different database connections
const atlas = 'mongodb+srv://logan:logan@cluster0.4kz1dqx.mongodb.net/?retryWrites=true&w=majority'
const local = 'mongodb://localhost:27017'

// Configures mongoose. Connects to the database.
mongoose.connect(atlas, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, // Add this line
    useFindAndModify: false
})