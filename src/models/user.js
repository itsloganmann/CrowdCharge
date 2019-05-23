const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Creates a schema, allows us to take advantage of middleware
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            // Validation to ensure email is in correct form.
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: Number,
        default: 0,
        validate(value) {
            // Custom validator
            if (value < 0) {
                throw new Error('phone must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            // Validation for password.
            if (value.includes('password')) {
                throw new Error('Password cannot contain the word password!')
            }

            if (value.length < 7) {
                throw new Error('Password is shorter than the minimum allowed length (7)!')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            // Validation for phone numbers.
            if (!validator.isNumeric(value)) {
                throw new Error('Phone number cannot contain characters!')
            }

            if (value.length !== 10) {
                throw new Error('Phone number must have 10 digits!')
            }
        }
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    hasNewNotifs: {
        type: Boolean,
        default: false,
        required: true
    }
})

// Creates a public profile function.
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    // Hides password and tokens from sending back to the client
    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Generates user web auth token. This is an instanced method.
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'zapsharerox')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Checks login credential. This is a static method.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    // Checks if user exists by email
    if (!user) {
        throw new Error('Unable to login!')
    }

    // Checks the plain text password with the stored hash password
    const isMatch = await bcrypt.compare(password, user.password)

    // Checks if the password matches
    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    // This only executes if the user is new or the password is changed. Hashes the password.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Models user and validates data
const User = mongoose.model('User', userSchema)

module.exports = User