const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  registerUser,
  getUsers,
  deleteUser,
  sendInvite,
  sendAnnouncementEmailToAll,
  sendClassAnnouncementEmailToAll,
} = require('../controllers/userController');

const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.post('/register', upload.single('profilePic'), registerUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.post('/send-invite', sendInvite);
router.post('/send-announcement', sendAnnouncementEmailToAll);
router.post('/send-class-announcement', sendClassAnnouncementEmailToAll);


module.exports = router;
