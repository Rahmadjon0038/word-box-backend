// routes/monthRoutes.js
const express = require('express');
const router = express.Router();
const monthController = require('../controllers/monthController');

// Guruh ichida oy yaratish
router.post('/groups/:groupId/months', monthController.createMonth);

// Guruhdagi oylarni olish
router.get('/groups/:groupId/months', monthController.getMonthsByGroup);

// Bitta oy
router.get('/:id', monthController.getMonthById);

// Oy yangilash
router.put('/:id', monthController.updateMonth);

// Oy o‘chirish
router.delete('/:id', monthController.deleteMonth);

module.exports = router;
