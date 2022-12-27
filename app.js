const express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express()

const sessionOptions = session({
    secret: 'this is a secret',
    store: MongoStore.create({client: require('./db')}),
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  //equals one day
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

 app.use((req, res, next) => {
     res.locals.errors = req.flash("errors")
     res.locals.regErrors = req.flash("regErrors")
     res.locals.user = req.session.usr
     next()
 })


const router = require('./router')

app.use(express.urlencoded( { extended: false } ))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app
