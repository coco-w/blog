const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

const sessionRouter = require('./router/session')

app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')))
app.use('/public/', express.static(path.join(__dirname, '/public/')))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(sessionRouter)
app.listen('8080', () => {
    console.log('gogogo')
})