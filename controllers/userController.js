const User = require('../models/User')

exports.login = (req, res) => { 
  const user = new User(req.body)
  user.login().then(result => {
    req.session.usr = { username: user.data.username }
    req.session.save(() => {
        res.redirect('/')
    })
  }).catch(e => {
      req.session.save(() => {
          req.flash('errors', e) 
          res.redirect('/')
    })
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
  if (user.errors.length) {
    user.errors.forEach((error) => {
        req.flash('regErrors', error)
    })
    req.session.save(() => {
        res.redirect('/')
    })
  } else {
    req.session.usr = { username: user.data.username }
    req.session.save(() => {
        res.redirect('/')
    })
  }
 // user.errors.length ? res.send(user.errors) : res.send("Congrats, there are no errors.")
}

exports.home = (req, res) => {
  !req.session.usr ? res.render('home-guest') : res.render('home-dashboard', { username: req.session.usr.username })  
}