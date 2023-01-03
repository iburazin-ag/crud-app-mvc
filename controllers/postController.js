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
        let post = await Post.findSingleById(req.params.id, req.visitorId)
        res.render('single-post-screen', { post: post } )

    } catch {
        res.render('404')
    }
    
}


exports.viewEditScreen = async (req, res) => {
    try {
        const post = await Post.findSingleById(req.params.id)
        res.render('edit-post', { post: post } )
        
    } catch {
        res.render('404')
    }
}


exports.editPost = (req, res) => {
    let post = new Post(req.body, req.visitorId, req.params.id)
    post.updatePost().then((status) => {
        // the post was succesfully updated in the database
        // user did have permission but there were validation errors
        if (status == 'success') {
            //post was updated in db
            req.flash('success', "Post successfully updated!")
            req.session.save(() => {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        } else {
            post.errors.forEach( error => {
                req.flash('errors', error)
            })
            req.session.save(() => {
                res.redirect(`/post/${req.params.id}/edit`) })
        }
    }).catch(() => {
        // a post with the requested ID doesn't exist
        // the current visitor is not the owner of the requested post 
        req.flash('errors', 'You do not have the permission to perform that action!')
        req.session.save(() => {
            res.redirect('/') })
    })
}

