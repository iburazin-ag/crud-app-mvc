exports.login = (req, res) => {
    
}

exports.logout = (req, res) => {
    
}

exports.register = (req, res) => {
    console.log(req.body)
    res.send('attempted registration!s')
}


exports.home = (req, res) => {
    res.render('home-guest')
}