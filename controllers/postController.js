//const Post = require('../models/Post')

exports.viewCreateScreen = (req, res) => {
    res.render('create-post', { username: req.session.usr.username }) //, avatar: req.session.usr.avatar
}