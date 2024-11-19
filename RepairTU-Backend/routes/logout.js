const express = require('express');
const router = express();

router.post('/logout', (req, res) => {
    /*
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    */
    // delete token in server side in this case not have
    res.status(200).json({ messgae: "Logout successful"});
})

module.exports = router;