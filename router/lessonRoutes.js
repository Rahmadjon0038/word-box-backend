const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../midlwares/authMidlwares');

// Userga mos darslar
router.get('/', authMiddleware, lessonController.getUserLessons);

// Yangi dars yaratish
router.post('/', authMiddleware, lessonController.createLesson);

// Darsni tahrirlash
router.put('/:id', authMiddleware, lessonController.updateLesson);

// Darsni o‘chirish
router.delete('/:id', authMiddleware, lessonController.deleteLesson);

module.exports = router;
