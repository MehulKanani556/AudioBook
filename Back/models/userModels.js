const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    mobileNo: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    // role: {
    //     type: String,
    //     require: true,
    //     enum: ['admin', 'user']
    // },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    bio: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    occupation: {
        type: String,
        require: true
    },
    studentVerificationStatus: {
        type: String,
        enum: ['Complete', "Pending"]
    },
    studentIdImage: {
        type: String,
        require: true
    },
    coins: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['Active', 'Block'],
        require: true
    },
    subScriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription',
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('user', userSchema);