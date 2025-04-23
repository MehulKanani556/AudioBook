const mongoose = require('mongoose')

const subScriptionSellSchema = mongoose.Schema({
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    expiryDate: {
        type: String,
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

module.exports = mongoose.model('subscriptionsell', subScriptionSellSchema)