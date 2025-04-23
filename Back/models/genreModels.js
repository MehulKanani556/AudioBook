const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    generImage: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('genre', genreSchema);