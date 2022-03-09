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
    console.log('the fruit model', Fruit);
    res.send("your server is running")
})
// =============================================================
//                         SERVER LISTENER
// =============================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})