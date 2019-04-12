const mongoose = require('mongoose')

const commentSchema = require('./comment').commentSchema
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})

const topicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: 'kong'
    },
    content: {
        type: String
    },
    create_time: {
        type: Date,
        required: true,
        default: Date.now
    },
    label: {
        type: Number,
        required: true,
        default: 1
    },
    pic: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Topic', topicSchema)