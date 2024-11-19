const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ""
        // required: true
    },
    username: {
        type: String,
        default: ""
        // required: true
    },
    image_path: {
        type: String,
        default: ""
        // required: true
    },
    details: {
        type: String,
        default: ""
    },
    major: {
        type: String,
        default: ""
    },
    referencePostId: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        // required: false,
        default: () => {
            const now = new Date();
            return now.toLocaleDateString() + "  |  " + now.toLocaleTimeString();
        }
    }
}, { collection:"requestListDone" })

module.exports = mongoose.model('requestListDone', requestSchema);