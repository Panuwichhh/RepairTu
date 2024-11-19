const express = require('express');
const UploadM = require('../models/upload');
const UploadAdminM = require('../models/adminUpload');
const authenticateToken = require('./authenticateToken');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const router = express();
const { google } = require('googleapis');

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './repairtuImage');
    },
    filename: function (req, file, callback) {
        const originalName = file.originalname;
        const fileExtension = path.extname(originalName);
        const baseName = path.basename(originalName, fileExtension);
        let newFilename = baseName + "_" + req.user.userId + fileExtension;
        let count = 1;

        const checkFileExist = (fileName) => {
            const filePath = path.join(__dirname, '../repairtuImage', fileName);
            return fs.existsSync(filePath);
        }

        while (checkFileExist(newFilename)) {
            newFilename = baseName + "_" + req.user.userId + `(${count})` + fileExtension;
            count++;
        }

        // console.log(newFilename);
        req.imagePath = path.join('repairtuImage', newFilename);
        callback(null, newFilename);
    }
})

const upload = multer({ storage });

//insert request json from frontend to database
// upload.array('name must be match with frontend name')
router.post('/upload', authenticateToken, upload.array('image'), async (req, res) => {
    req.body.userId = req.user.userId;
    req.body.username = req.user.username;
    req.body.image_path = req.imagePath;
    const request = req.body;
    try {
        const insertData = await UploadM.insertMany(request);
        console.log("insertData Success\n" + insertData);
        res.status(201).json({ message: "success" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
})

router.post('/uploadAdmin', authenticateToken, upload.array('image'), async (req, res) => {
    req.body.userId = req.user.userId;
    req.body.username = req.user.username;
    req.body.image_path = req.imagePath;
    const referencePostId = req.body.referencePostId;
    const request = req.body;
    try {
        const filter = await UploadM.findOne({ _id: referencePostId });
        console.log(filter)
        const updateStatus = {
            $set: {
                status: "repaired"
            }
        }
        const updateResult = await UploadM.updateOne({ _id: referencePostId }, updateStatus);
        if (updateResult.modifiedCount === 1) {
            const insertData = await UploadAdminM.insertMany(request);
            console.log("insertData Success\n" + insertData);
            console.log("Update Data: "+(updateResult.modifiedCount === 1));
            res.status(201).json({ message: "success" });
        } else {
            res.status(401).json({ message: "Error"})
        };
    } catch (err) {
        console.error(err);
        res.status(500);
    }
})

router.get('/upload', async (req, res) => {
    try {
        const requests = await UploadM.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/upload/getUser', authenticateToken, (req, res) => {
    res.json(req.user);
})

router.get('/upload/:postId', async (req, res) => {
    const postId = req.params.postId;
    // console.log(postId);
    try {
        const request = await UploadM.findOne({ _id: postId });
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/uploadAdmin/:referencePostId', async (req, res) => {
    const referencePostId = req.params.referencePostId;
    // console.log(referencePostId);
    try {
        const request = await UploadAdminM.findOne({ referencePostId: referencePostId });
        // console.log(request)
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;