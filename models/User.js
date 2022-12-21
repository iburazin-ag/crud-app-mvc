let User = function(data) {
    this.username = data.username,
    this.email = data.email
}

User.prototype.register = (data) => {
    console.log(data)
}

module.exports = User