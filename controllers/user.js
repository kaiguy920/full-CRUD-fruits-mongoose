// =============================================================
//                      IMPORT DEPENDENCIES
// =============================================================
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// =============================================================
//                          CREATE ROUTER
// =============================================================
const router = express.Router()


// =============================================================
//                          ROUTES
// =============================================================

// two sign up routes
// get to render the signup form
router.get('/signup', (req, res) => {
    res.send('sign up page')
})
// post to send the signup info
router.post('/signup', (req, res) => {
    res.send("signup -> post")
})

// two login routes
// get to render the login form
router.get('/login', (req, res) => {
    res.send("login page")
})
// post to send the login info(& create a session)
router.post('/login', (req, res) => {
    res.send("login -> post")
})


// signout route -> destroy the session

// =============================================================
//                         EXPORT ROUTER
// =============================================================
module.exports = router