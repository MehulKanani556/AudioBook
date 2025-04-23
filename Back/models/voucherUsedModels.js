const mongoose = require('mongoose')

const voucherUsedSchema = mongoose.Schema({
    voucharId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    usedDate: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('voucheruserd', voucherUsedSchema);          