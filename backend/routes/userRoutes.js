const express = require('express');
const router = express.Router();
const multer = require('multer');
<<<<<<< HEAD
const {
  registerUser,
  getUsers,
  deleteUser,
} = require('../controllers/userController');
=======
>>>>>>> 45c6a4c (intruction add)
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
<<<<<<< HEAD


=======
>>>>>>> 45c6a4c (intruction add)

module.exports = router;
