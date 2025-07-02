const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  registerUser,
  getUsers,
  makeAdmin,
  auth,
} = require('../controllers/userController');

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/register', upload.single('profilePic'), registerUser);
router.get('/users',auth, getUsers);
router.post('/make-admin', makeAdmin);

module.exports = router;
