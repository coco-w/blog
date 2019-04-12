const express = require('express')
const User = require('../modles/user')
const Topic = require('../modles/topic')
const md5 = require('blueimp-md5')
const router = express.Router()


router.get('/', (req, res) => {
    Topic.find((err, docs) => {
        if (err) {
            console.log(err)
        }

        res.render('index.html', {
            topics: docs,
            user: req.session.user
        })
    })
})
router.get('/test', (req, res) => {
    Topic.find((err, doc) => {
        res.render('../test.html', {
            data: doc
        })
    })
})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', async (req, res) => {
    let body = req.body
    // console.log(body)
    body.password = md5(md5(body.password))
    try {
        await User.findOne(body, (err, data) => {

            if (data) {
                req.session.user = data

                return res.status(200).json({
                    err_code: 0,
                    message: '登录成功'
                })
            }
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或密码错误'
            })
        })
    } catch (error) {
        return res.status(500).json({
            err_code: 500,
            message: 'server  error'
        })
    }

})
router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', async (req, res) => {
    let body = req.body
    try {
        if (await User.findOne({
                email: body.email
            })) {
            return res.status(200).json({
                err_code: 1,
                message: 'email已经注册'
            })
        }
        if (await User.findOne({
                nickname: body.nickname
            })) {
            return res.status(200).json({
                err_code: 1,
                message: 'name已经注册'
            })
        }
        body.password = md5(md5(body.password))
        user = await new User(body).save()
        req.session.user = user

        return res.status(200).json({
            err_code: 2,
            message: '注册成功'
        })
    } catch (err) {
        return res.status(500).json({
            err_code: 500,
            message: 'server error'
        })
    }
    // findOne({
    //     $or: [
    //         {email: body.email},
    //         {nickname: body.nickname}
    //     ]
    // }).then((data) => {
    //     if (data) {
    //         return res.status(200).json({
    //             err_code: 1,
    //             message: 'email或name 已经注册'
    //         })

    //     }
    //     new User({
    //         email: body.email,
    //         nickname: body.nickname,
    //         password: md5(md5(body.password))
    //     }).save((err) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 err_code: 500,
    //                 message: '服务器忙'
    //             })
    //         }
    //         return res.status(200).json({
    //             err_code: 2,
    //             message: '注册成功'
    //         })
    //     })
    // })
})

router.post('/emailValidate', async (req, res) => {
    let body = req.body
    try {
        if (await User.findOne({
                email: body.email
            })) {
            return res.status(200).json({
                err_code: 1,
                message: 'email被注册'
            })
        }
        return res.status(200).json({
            err_code: 2,
            message: 'email可以使用'
        })
    } catch (error) {
        return res.status(500).json({
            err_code: 500,
            message: 'server error'
        })
    }

})

router.get('/logout', (req, res) => {
    delete(req.session.user)
    res.redirect('/')
})


router.get('/profile', (req, res) => {
    if (!req.session.user) {
        res.render('login.html')
    }

    res.render('userhome.html', {
        user: req.session.user
    })
})

router.get('/settings/profile', (req, res) => {
    if (!req.session.user) {
        res.render('login.html')
    }
    res.render('profile.html', {
        user: req.session.user
    })

})

router.post('/settings', (req, res) => {
    let body = req.body
    // console.log(body)
    User.findByIdAndUpdate(body.id.replace(/"/g, ''), {
        nickname: body.nickname,
        bio: body.bio,
        gender: body.gender,
        last_modified_time: Date.now()
    }, {
        new: true
    }, (err, data) => {
        //wdnmd mongoose
        if (err) {
            return console.log(err)
        }

        req.session.user = data
        res.redirect('/')

    })

})

module.exports = router