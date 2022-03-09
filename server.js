// =============================================================
//                      IMPORT DEPENDENCIES
// =============================================================
// this allows us to load our env variables
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const Fruit = require("./models/fruit")

// =============================================================
//           CREATE OUR EXPRESS APPLICATION OBJECT
// =============================================================

const app = require('liquid-express-views')(express())

// =============================================================
//                          MIDDLEWARE
// =============================================================
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))


// =============================================================
//                        ROUTES
// =============================================================
app.get('/', (req, res) => {
    res.send("your server is running")
})

app.get('/fruits/seed', (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    // when we seed data, there are a few steps involved
    // delete all the data that already exists(will only happen if data exists)
    Fruit.remove({})
        .then(data => {
            console.log("this is what remove returns", data)
            // then we create with our seed data
            Fruit.create(startFruits)
                .then(data => {
                    console.log('this is what create returns', data);
                    res.send(data)
                })
        })

    // then we can send if we want to see that data
})

// INDEX route
app.get('/fruits', (req, res) => {
    // find the fruits
    Fruit.find({})
        // then render a template AFTER they're found
        .then(fruits => {
            console.log(fruits)
            res.render('fruits/index.liquid', { fruits })
        })
        // show an error if there is one
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// NEW route -> GET route that renders our page with the form
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new')
})
// CREATE route -> POST route that actually calls the db and makes a new document
app.post('/fruits', (req, res) => {
    // check if the readyToEat property should be true or false
    // we can check AND set this property in one line of code
    // first part sets the property name
    // second is a ternary to the value
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    console.log('this is the fruit to create', req.body);
    // now we're ready for mongoose to do its thing
    Fruit.create(req.body)
        .then(data => {
            console.log('this was returned from create', data);
            res.redirect('/fruits')
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// SHOW route
app.get('/fruits/:id', (req, res) => {
    // first, we need to get the id
    const fruitId = req.params.id
    // then we can find a fruit by its id
    Fruit.findById(fruitId)
        // once found, we can render a view with the data
        .then(fruit => {
            res.render('fruits/show', { fruit })
        })
        // if there's an error, show that instead
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// =============================================================
//                         SERVER LISTENER
// =============================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})