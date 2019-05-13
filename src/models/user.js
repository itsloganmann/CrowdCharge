const mongoose = require('mongoose')
const validator = require('validator')

// Models user and validates data
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            // Custom validator
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot contain the word password')
            }

            if (value.length < 7) {
                throw new Error('Password is shorter than the minimum allowed length (7)')
            }
        }
    }
})

module.exports = User