const mongoose = require('mongoose')

const homeLabelJoinSchema = mongoose.Schema({
    homeLabelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeLabel',
        require: true
    },
    audioBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AudioBook',
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('homelabeljoin', homeLabelJoinSchema);