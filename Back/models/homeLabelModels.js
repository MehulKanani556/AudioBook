const mongoose = require('mongoose');

const homeLabelSchema = mongoose.Schema({
    labelName: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('homeLabel', homeLabelSchema);