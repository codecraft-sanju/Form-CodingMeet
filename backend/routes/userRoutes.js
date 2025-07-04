const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  registerUser,
  getUsers,
  deleteUser,
  sendInvite, 
} = require('../controllers/userController');

const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.post('/register', upload.single('profilePic'), registerUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.post('/send-invite', sendInvite);

module.exports = router;
