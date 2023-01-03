const User = require('../models/User')
const Post = require('../models/Post')

exports.loggedIn = (req, res, next) => {
    req.session.user ? next() 
    : req.session.save(() => {
        req.flash('errors', "You must be logged in to perform that action.")
        res.redirect('/')
      })
    }
  

exports.login = (req, res) => { 
  const user = new User(req.body)
  user.login().then(result => {
    req.session.user = { username: user.data.username, _id: user.data._id }
    req.session.save(() => res.redirect('/'))
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


exports.register = async (req, res) => {
  const user = new User(req.body)
  await user.register().then(() => {
    req.session.user = { username: user.data.username, _id: user.data._id }
    req.session.save(() => res.redirect('/'))
  }).catch((regErrors) => {
    regErrors.forEach((error) => {
        req.flash('regErrors', error)
    })
    req.session.save(() => res.redirect('/'))
  })
  
}


exports.home = (req, res) => {
    !req.session.user ? res.render('home-guest') : res.render('home-dashboard')  
}


exports.userExists = (req, res, next) => {
    User.findByUsername(req.params.username).then((userDocument) => {
        req.profileUser = userDocument
        next()
    }).catch(() => {
        res.render('404')
    })

}


exports.profilePostsScreen = (req, res) => {
    Post.findByAuthorId(req.profileUser._id).then((posts) => {
        res.render('profile', { 
            posts: posts,
            profileUsername: req.profileUser.username })
    }).catch(() => {
        res.render('404')
    })
}