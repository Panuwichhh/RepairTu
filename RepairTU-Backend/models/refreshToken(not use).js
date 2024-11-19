const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    refreshToken:{
        type: String
    }
}, { collection: 'refreshToken' });

module.exports = mongoose.model('refreshToken', refreshTokenSchema);