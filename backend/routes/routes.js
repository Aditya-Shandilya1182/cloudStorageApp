const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const linkController = require('../controllers/linkController');
const accessController = require('../controllers/accessController');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/auth/register', registerUser);

router.post('/auth/login', loginUser);

// Route to upload a new file
router.post('/upload', uploadController.uploadFile);

// Route to create a link for sharing the file
//router.post('/create-link', linkController.createFileLink);

// Route to get all links for a file
//router.get('/file-links/:fileId', linkController.getFileLinks);

// Route to control access to the file via email
//router.post('/access-file', accessController.accessFile);

module.exports = router;
