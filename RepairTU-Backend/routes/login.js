require('dotenv').config();
const express = require('express');
const UsersMD = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const refreshTokenM = require('../models/refreshToken');


router.post('/login', async (req, res) => {
    try {
        // check user exit?
        // console.log(req.body)
        const check = await UsersMD.findOne({ studentId: req.body.studentId });
        // console.log(check)
        if (!check) {
            res.status(404).json({ message: "ID not found." });
        }
        // console.log(check.username)
        else if (check.password === req.body.password) {

            //user autherization
            const user = { userId: check._id.toString(), username: check.username, studentId: check.studentId};
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

            //refreshToken store in database for each user
            // await insertRefreshToken(refreshToken, check._id.toString());

            //accessToken always store in client side
            res.json({ accessToken: accessToken, refreshToken: refreshToken, role: check.role});
        } else {
            res.status(401).json({ message: "Password incorect." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error occurr" });
    }
})

router.post('/login/token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) res.status(401).json({ message: "Refresh Token required." });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        const userData = { userId: user.userId, username: user.username, stuentId: user.studentId }
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        res.json({ accessToken: accessToken })
    });
})


// generate Access Token
// function generateAccessToken(user) {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '15s'});
// }

// insert refresh token into database
// async function insertRefreshToken(token, userId) {
//     try{
//         const tokenModel = [{ userId: userId, refreshToken: token }];
//         const insertToken = await refreshTokenM.insertMany(tokenModel);
//         console.log("insert success: \n"+insertToken);
//     } catch (err) {
//         console.log(err);
//         throw new Error("Insert token error");
//     }
// }

module.exports = router;