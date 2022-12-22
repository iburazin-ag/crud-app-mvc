const User = require('../models/User')

exports.login = (req, res) => {
  const user = new User(req.body)
  user.login().then(result => {
    res.send(result)
  }).catch(e => {
    res.send(e)
  })
}

exports.logout = (req, res) => {
  
}

exports.register = (req, res) => {
  const user = new User(req.body)
  user.register()
  user.errors.length ? res.send(user.errors) : res.send("Congrats, there are no errors.")
}

exports.home = (req, res) => {
  res.render('home-guest')
}