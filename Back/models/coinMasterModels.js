const mongoose = require('mongoose')

const coinMasterSchema = mongoose.Schema({
    coin: {
        type: String,
        require: true
    },
    payment: {
        type: String,
        require: true
    },
    freeCoins: {
        type: String,
        require: true
    },
    labelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coinlabel',
        require: true
    },
    isOneTime: {
        type: String,
        require: true
    },
    validTill: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ['Active', 'Block']
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('coinmaster', coinMasterSchema);