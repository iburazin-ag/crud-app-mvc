const postsCollection = require('../db').db().collection("posts")
const ObjectId = require('mongodb').ObjectId

let Post = function(data, userid) {
    this.data = data
    this.errors = []
    this.userid = userid
  }


  Post.prototype.cleanUp = function() {
    if(typeof(this.data.title) != 'string') {this.data.title = ''}
    if(typeof(this.data.body) != 'string') {this.data.body = ''}

    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectId(this.userid)
      }
  }

  Post.prototype.validate = function() {
    if (this.data.title == "") {this.errors.push("You must provide a title.")}
    if (this.data.body == "") {this.errors.push("You must provide post content.")}
  }

  Post.prototype.create = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        this.validate()

        if (!this.errors.length) {
            await postsCollection.insertOne(this.data)
            resolve()
          } else {
            reject(this.errors)
          }

    })
  }

  Post.findSingleByID = function(id) {
    return new Promise (async (resolve, reject) => {
        if(typeof(id) != 'string' || !ObjectId.isValid(id)) {
            reject()
            return
        }
        const post = await postsCollection.findOne({ _id: new ObjectId(id) })
        post ? resolve(post) : reject() 
    })
  }

  module.exports = Post