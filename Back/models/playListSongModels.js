const mongoose = require('mongoose')

const playListSongSchema = mongoose.Schema({
    playListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'playList',
        require: true
    },
    episodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'episode',
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('playlistsong', playListSongSchema)