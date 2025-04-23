const mongoose = require('mongoose')

const coinSellSchema = mongoose.Schema({
    coinMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coinmaster',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    amount: {
        type: String,
        require: true
    },
    paymentId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['Active', 'Block'],
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('coinsell', coinSellSchema)