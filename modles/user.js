const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Number,
        default: 0,
        //0 正常,
        //1 不可评论，
        //2 不可登录,
        enum: [0,1,2]
    },
    gender: {
        type: Number,
        default: -1,
        // -1 保密
        // 0 男
        // 1 女
        enum: [-1, 0, 1]
    },
    bio: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema)


