const mongoose = require('mongoose')

const subScriptionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dicount: {
        type: String,
        require: true
    },
    scratchPrice: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ['Active', 'Block']
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('subscription', subScriptionSchema)