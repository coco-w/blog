const express = require('express')
const users = require('../modles/user')

const router = express.Router()



router.get('/', (req, res) => {
    res.render('index.html')
})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {
    res.render('login.html')
})
router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', (req, res) => {
    new users(req.body).save((err) => {
        if (err) {
            throw err
        }
        console.log('保存成功')
        res.redirect('/login')
    })
})
module.exports = router