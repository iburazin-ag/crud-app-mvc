const User = require('../models/User')

exports.login = (req, res) => {
    
}

exports.logout = (req, res) => {
    
}

exports.register = (req, res) => {
    const { username, email, password } = req.body
    const user = new User({ username, email })
    user.register(user)
    res.send('attempted registration sent')
}


exports.home = (req, res) => {
    res.render('home-guest')
}