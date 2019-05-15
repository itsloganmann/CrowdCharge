const mongoose = require('mongoose')
const atlas = 'mongodb+srv://zapshare:comp2930@zapshare-api-wylcv.mongodb.net/zapshare?retryWrites=true'
const local = 'mongodb://127.0.0.1:27017/zapshare-api'

// Configures mongoose. Connects to the database.
mongoose.connect(atlas, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})