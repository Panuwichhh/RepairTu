require('dotenv').config();
const mongoose = require('mongoose');


const connectAppDB = async () => {
    try {
        //database url
        const conn = await mongoose.connect(process.env.APP_DATABASE_URL);
        console.log("Database connected.")
    } catch (err) {
        console.error(err)
    }
}

module.exports = { connectAppDB };

