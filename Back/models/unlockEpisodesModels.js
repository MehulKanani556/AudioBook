const mongoose = require('mongoose');

const unlockEpisodesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    episodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'episode',
        require: true
    },
    date: {
        type: String,
        require: true
    },
    coinLabelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coinlabel',
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('unlockepisodes', unlockEpisodesSchema);