const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, getUsers } = require('../controllers/userController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/register', upload.single('profilePic'), registerUser);
router.get('/users', getUsers);

module.exports = router;
