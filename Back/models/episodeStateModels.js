const mongoose = require('mongoose')

const episodeStateSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    unlockEpisodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unlockEpisode',
        require: true
    },
    watchedTill: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('episodestate', episodeStateSchema);