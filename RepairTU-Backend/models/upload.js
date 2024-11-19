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
    location: {
        type: String,
        default: ""
        // required: true
    },
    issue: {
        type: String,
        default: ""
        // required: true
    },
    details: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending"
        // required: true
    },
    time: {
        type: String,
        // required: false,
        default: () => {
            const now = new Date();
            return now.toLocaleDateString() + "  |  " + now.toLocaleTimeString();
        }
    }
}, { collection:"requestList" })

module.exports = mongoose.model('requestList', requestSchema);