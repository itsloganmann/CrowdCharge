const mongoose = require('mongoose')
// Configures mongoose. Connects to the database.
const connectionURL ='mongodb://127.0.0.1:27017/ZapShare'
// const connectionURL = 'mongodb+srv://admin:zapshare@zapshare-qqjxu.mongodb.net/ZapShare?retryWrites=true'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})