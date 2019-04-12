const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})

exports.commentSchema = mongoose.Schema({
    comments:[
        {
            author:{
                type: String,
                required: true
            },
            create_time: {
                type: Date,
                required: true,
                default: Date.now
            },
            content: {
                type: String,
                required: true,
                default: ''
            },
            pic: {
                type: String,
            },
            nickname: {
                type: String,
            }
        }
    ]
})


exports.model = mongoose.model('Comment', exports.commentSchema)