const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  registerUser,
  getUsers,
  deleteUser,
} = require('../controllers/userController');


const { storage } = require('../config/cloudinary');
const {
  registerUser,
  getUsers,
  deleteUser,
} = require('../controllers/userController');



const upload = multer({ storage });

router.post('/register', upload.single('profilePic'), registerUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);


module.exports = router;
