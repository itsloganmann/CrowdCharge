const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Middleware for auth before proceeding. Requires proper web token.
const auth = async (req, res, next) => {
    try {
        // Stores incoming token from the header and gets rid of Bearer in the string
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'zapsharerox')
        console.log(decoded)

        // Finds a user with a correct id with the authentication stored
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }

        // Stores found user data and token so we don't have to query again 
        req.user = user
        req.token = token

        // User has proven they have been authenticated properly
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
} 

module.exports = auth