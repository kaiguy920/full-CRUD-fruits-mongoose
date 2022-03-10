// =============================================================
//                      IMPORT DEPENDENCIES
// =============================================================
// this allows us to load our env variables
require("dotenv").config()
const express = require("express")
// We no longer need this reference bc it lives in the fruit controller now
// const Fruit = require("./models/fruit")
// now that we're using controllers as the should be used, we need to require our routers
const FruitRouter = require('./controllers/fruit')
const UserRouter = require('./controllers/user')
const HomeRouter = require('./controllers/home')
const middleware = require("./utils/middleware")


// =============================================================
//           CREATE OUR EXPRESS APPLICATION OBJECT
// =============================================================

const app = require('liquid-express-views')(express())

// =============================================================
//                          MIDDLEWARE
// =============================================================

middleware(app)

// =============================================================
//                        ROUTES
// =============================================================
// send all '/fruits' routes to the Fruit Router
app.use('/fruits', FruitRouter)
app.use('/user', UserRouter)
app.use('/', HomeRouter)

// old home, now using HomeRouter
// app.get('/', (req, res) => {
//     res.send("your server is running")
// })

// =============================================================
//                         SERVER LISTENER
// =============================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
})