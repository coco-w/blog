const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const sessionRouter = require('./router/session')
const topicRouter = require('./router/topic')

app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')))
app.use('/public/', express.static(path.join(__dirname, '/public/')))
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true 
}))


app.use(sessionRouter)
app.use(topicRouter)

app.listen('8080', () => {
    console.log('gogogo')
})