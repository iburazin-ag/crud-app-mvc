const Post = require('../models/Post')

exports.viewCreateScreen = (req, res) => {
    res.render('create-post') 
}

exports.createPost = (req, res) => {
    const post = new Post(req.body, req.session.user._id)
    post.create().then(() => {
        res.send("New post created.")
      }).catch((errors) => {
        res.send(errors)
      })
}

exports.viewSinglePost = async (req, res) => {
    try {
        const post = await Post.findSingleByID(req.params.id, req.visitorId)
        res.render('single-post-screen', { post: post } )

    } catch {
        res.render('404')
    }
    
}


exports.viewEditScreen = async (req, res) => {
    try {
        const post = await Post.findSingleByID(req.params.id)
        res.render('edit-post', { post: post } )
        
    } catch {
        res.render('404')
    }
}