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

// Faqat login bo‘lgan user o‘z profilini olish
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: "Profil ma’lumotlari ✅", user: req.user });
});

module.exports = router;
