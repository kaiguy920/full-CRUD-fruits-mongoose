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
    res.render('users/signup')
})
// post to send the signup info
router.post('/signup', async (req, res) => {
    // console.log('this is initial req.body in signup', req.body)
    // first encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    // console.log('req.body after hash', req.body)
    // create a new user
    User.create(req.body)
        // if created successfully redirect to login
        .then(user => {
            res.redirect('/user/login')
        })
        // if an error occurs, send err
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

// two login routes
// get to render the login form
router.get('/login', (req, res) => {
    res.send('login page')
})
// post to send the login info(and create a session)
router.post('/login', (req, res) => {
    res.send('login -> post')
})

// signout route -> destroy the session


// signout route -> destroy the session

// =============================================================
//                         EXPORT ROUTER
// =============================================================
module.exports = router