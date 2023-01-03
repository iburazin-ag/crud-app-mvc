const express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const markdown = require('marked')
const sanitizeHTML = require('sanitize-html')
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
    res.locals.filterUserHTML = content => {
        return sanitizeHTML(markdown.parser(content), {
            allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'bold', 'i', 'em' ], 
            allowedAttributes: {}
        })
    }

     res.locals.errors = req.flash("errors")
     res.locals.regErrors = req.flash("regErrors")
     res.locals.success = req.flash("success") 
     
     req.session.user ? req.visitorId = req.session.user._id : req.visitorId = 0
     res.locals.user = req.session.user
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
