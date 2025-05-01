const mongoose = require('mongoose')

const episodesSchema = mongoose.Schema({
    audioBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AudioBook',
        required: true
    },
    name:{
        type: String,
        require:true,
    },
    audioFile: {
        type: String,
        require: true
    },
    premium: {
        type: String,
        require: true
    },
    coinRequired: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('episodes', episodesSchema)