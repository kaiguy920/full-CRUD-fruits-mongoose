// =============================================================
//                        IMPORT DEPENDENCIES
// =============================================================
const mongoose = require('./connection')

// =============================================================
//                       DEFINE USER MODEL
// =============================================================
// pull the schema and model constructors from mongoose
// we're going to use something called destructuring to accomplish this

const { Schema, model } = mongoose

// make a user Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// make a user model

const User = model("User", userSchema)

// =============================================================
//                       EXPORT USER MODEL
// =============================================================

module.exports = User