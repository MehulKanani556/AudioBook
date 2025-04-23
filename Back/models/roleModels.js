const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('roles', roleSchema)