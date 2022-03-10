// =============================================================
//                      IMPORT DEPENDENCIES
// =============================================================
// this allows us to load our env variables
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
// We no longer need this reference bc it lives in the fruit controller now
// const Fruit = require("./models/fruit")
// now that we're using controllers as the should be used, we need to require our routers
const FruitRouter = require('./controllers/fruit')

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
// send all '/fruits' routes to the Fruit Router
app.use('/fruits', FruitRouter)

app.get('/', (req, res) => {
    res.send("your server is running")
})



// =============================================================
//                         SERVER LISTENER
// =============================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})