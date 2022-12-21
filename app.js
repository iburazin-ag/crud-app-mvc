const express = require("express")
const app = express()

const router = require('./router')

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})