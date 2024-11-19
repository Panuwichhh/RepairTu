const express = require('express');
const login = require('./login');
const upload = require('./upload');
const logout = require('./logout');
const router = express();
const path = require('path');
const authenticateToken = require('./authenticateToken');


router.post('/login', login);
router.post('/login/token', login);

//Check user info from token
router.get('/upload/getUser', upload);

//Get all post infomation
router.get('/upload', upload);
//Get 1 post Infomation
router.get('/upload/:postId', upload)
router.get('/uploadAdmin/:referencePostId', upload);
//Insert post infomation
router.post('/upload', upload);
router.post('/uploadAdmin', upload);

//Get post image
router.use('/repairtuImage', express.static(path.join(__dirname, '../repairtuImage')));

router.post('/logout', logout);



module.exports = router;