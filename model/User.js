const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 20,
    },
    email: {
        type: String,
        require: true,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('User', userSchema);