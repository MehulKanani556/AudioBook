const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    audioBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AudioBook',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    date: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('review', reviewSchema)