const express = require('express')
const User = require('../modles/user')
const md5 = require('blueimp-md5')
const router = express.Router()

function findOne(query) {
    return new Promise((resolve, reject) => {
        User.findOne(query, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

router.get('/', (req, res) => {
    res.render('index.html')
})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {
    let body = req.body
    findOne({
        email: body.email,
        password: md5(md5(body.password))
    }).then((data) => {
        console.log(data)
        if (data) {
            return res.status(200).json({
                err_code: 2,
                message: '登录成功'
            })
        }
    })

})
router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', (req, res) => {
    let body = req.body
    findOne({
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    }).then((data) => {
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'email或name 已经注册'
            })
            
        }
        new User({
            email: body.email,
            nickname: body.nickname,
            password: md5(md5(body.password))
        }).save((err) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务器忙'
                })
            }
            return res.status(200).json({
                err_code: 2,
                message: '注册成功'
            })
        })
    })
})

router.post('/emailValidate', (req, res) => {
    let body = req.body
    let query = {
        email: body.email
    }
    findOne(query).then((data) => {
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'email 已经注册'
            })
        }
        return res.status(200).json({
            err_code: 2,
            message: '可用'
        },(err) => {
            return res.status(500).json({
                err_code: 500,
                message: 'server error'
            })
        })
    })
})
module.exports = router