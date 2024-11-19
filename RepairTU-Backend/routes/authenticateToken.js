require('dotenv').config();
const jwt = require('jsonwebtoken');

//login middleman
const authenticateToken = (req, res, next) => {
    console.log("Middleware reached");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // check if bearer get though
    // console.log(req.headers);
    // console.log(authHeader);
    // console.log(token);
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;