const mongoose = require('mongoose')

const voucherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
    coinMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoinMaster',
        require: true
    },
    subScriptionSellId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscriptions',
        require: true
    },
    validTill: {
        type: String,
        require: true
    },
    forStudent: {
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

module.exports = mongoose.model('voucher', voucherSchema)