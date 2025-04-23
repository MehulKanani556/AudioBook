const mongoose = require('mongoose')

const coinLableSchema = mongoose.Schema({
    labelName: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('coinlabel', coinLableSchema)