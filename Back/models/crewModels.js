const mongoose = require('mongoose')

const crewSchema = mongoose.Schema({
    audiBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'audiobook',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        require: true
    },
    crewImage: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('crew', crewSchema)