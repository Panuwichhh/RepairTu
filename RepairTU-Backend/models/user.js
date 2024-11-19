const mongoose = require('mongoose');

/*
{
    username,
    student id,
    password,
    role,
}
*/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('users', userSchema)