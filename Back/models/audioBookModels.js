const mongoose = require('mongoose')

const audioBookSchema = mongoose.Schema({
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    sampleFile: {
        type: String,
        require: true
    },
    tags: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true,
        enum: ['English', 'German', 'French']
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('audiobook', audioBookSchema)