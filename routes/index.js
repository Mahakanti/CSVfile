// Importing Packages
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Importing Controllers
const homeController = require('../controller/homeController');
const fileController = require('../controller/fileController');
const upload = multer({ dest: 'uploads/files'})

// Making Routes
router.get('/', homeController.home);
router.post('/upload', upload.single('file') ,fileController.upload);
//It  is used to configure Multer to handle a single file upload in a web application. It specifies that the uploaded file should be associated with the form field named 'file.' 
router.get('/view/:id', fileController.view);
router.get('/delete/:id', fileController.delete);

module.exports = router;