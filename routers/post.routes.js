const express = require('express')
const authmiddleware = require('../middleware/auth.middleware')
const multer = require('multer');
const { createPostController } = require('../controllers/post.controller');
const upload = multer({storage: multer.memoryStorage()})

const router = express.Router();

router.post('/', authmiddleware , 
    upload.single('image'),
    createPostController
)


module.exports = router