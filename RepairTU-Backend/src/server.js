require("dotenv").config();
const express = require('express');
const route = require('../routes/apiRoutes')
const app = express();
const Users = require("../models/user");
const { connectAppDB } = require('./dbconfig');
const cors = require('cors');
const path = require('path');
// const insertRandomUsers = require('../models/insertRandomUsers')

app.use(cors());
//tell express to use json
app.use(express.json());
//connect database
connectAppDB();

app.get('/Hello', (req, res) => {
    res.send('Hello');
})

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        // console.log(users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Users.findOne({ _id: userId });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.use("/api", route);
// app.use('/repairtuImage', express.static(path.join(__dirname, '../repairtuImage')));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../RepairTU-Frontend/dist')));

// Catch-all route to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../RepairTU-Frontend/dist', 'index.html'));
});

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server connected...");
});
