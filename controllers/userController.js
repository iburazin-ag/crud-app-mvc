const User = require('../models/User')

exports.login = (req, res) => {
    console.log('login')
}

exports.logout = (req, res) => {
    
}

exports.register = (req, res) => {
    //const { username, email, password } = req.body
    //const user = new User({ username, email, password })
    const user = new User(req. body)
    user.register()
    if (user.errors.length) {
        res.send(user.errors)
    } else {
        console.log(user)
        res.send("No errors")
    }
}


exports.home = (req, res) => {
    res.render('home-guest')
}