const mongoose = require('mongoose')
const atlas = 'mongodb+srv://zapshare:comp2930@zapshare-api-wylcv.mongodb.net/test?retryWrites=true'
const local = 'mongodb://127.0.0.1:27017/zapshare-api'

// Configures mongoose. Connects to the database.
mongoose.connect(atlas, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// // EXAMPLE: Learn how to create new instances of a model and save it to the db
// const me = new User({
//     name: '    Edwin    ',
//     email: 'paU.edwin@LIVE.CA',
//     password: 'mypass123'
// })

// me.save().then( (resolve) => {
//     console.log(resolve)
// }).catch( (reject) => {
//     console.log('Error!', reject)
// })

// // EXAMPLE: Creates mongoose data model for a task object and add validator to data
// const task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// // EXAMPLE: Instantiates a new document of task object
// const cleaning = new task({
//     description: 'Cleaning   '
// })

// // EXAMPLE: Saves the created task object into the db
// cleaning.save().then( (resolve) => {
//     console.log(resolve)
// }).catch( (reject) => {
//     console.log(reject)
// })