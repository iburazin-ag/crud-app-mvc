const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

router.get('/', userController.home)

//user routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//profile routes
router.get('/profile/:username', userController.userExists, userController.profilePostsScreen)

//post routes
router.get('/create-post', userController.loggedIn, postController.viewCreateScreen) 
router.post('/create-post', userController.loggedIn, postController.createPost)
router.get('/post/:id', postController.viewSinglePost)


module.exports = router
