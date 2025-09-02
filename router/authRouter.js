const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/authController');
const authMiddleware = require('../midlwares/authMidlwares');

const router = express.Router();

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Register va login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Avatar yuklash (faqat login bo‘lgan user)
router.post('/:id/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);

// Yangi user/me API
router.get('/me', authMiddleware, userController.getMe);

// Yangi barcha userlarni olish admin uchun
router.get('/users', authMiddleware, userController.getAllUsers);

module.exports = router;
