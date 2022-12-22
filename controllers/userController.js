const User = require('../models/User')

exports.login = (req, res) => { 
  const user = new User(req.body)
  user.login().then(result => {
    req.session.usr = { username: user.data.username }
    req.session.save(() => {})
    res.redirect('/')
  }).catch(e => {
    res.send(e)
  })
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
      res.redirect('/')
  })
}

exports.register = (req, res) => {
  const user = new User(req.body)
  user.register()
  user.errors.length ? res.send(user.errors) : res.send("Congrats, there are no errors.")//res.redirect('/')
}

exports.home = (req, res) => {
  req.session.usr ? res.render('home-dashboard', { username: req.session.usr.username }) : res.render('home-guest')
}