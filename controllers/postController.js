const Post = require('../models/Post')

exports.viewCreateScreen = (req, res) => {
    res.render('create-post') 
}

exports.createPost = (req, res) => {
    const post = new Post(req.body, req.session.usr._id)
    post.create().then(() => {
        res.send("New post created.")
      }).catch((errors) => {
        res.send(errors)
      })
}