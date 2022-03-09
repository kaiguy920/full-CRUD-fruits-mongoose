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

// =============================================================
//                         SERVER LISTENER
// =============================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})