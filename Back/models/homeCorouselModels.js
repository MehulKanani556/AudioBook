const mongoose = require('mongoose')

const homeCorouselSchema = mongoose.Schema({
    homeCorouselImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('homecorousel', homeCorouselSchema)