const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../midlwares/authMidlwares');

// Guruh yaratish
router.post('/create', authMiddleware, groupController.createGroup);

// Guruhga user qo‘shish
router.post('/add-user', authMiddleware, groupController.addUserToGroup);

// Userning guruhlari
router.get('/my-groups', authMiddleware, groupController.getUserGroups);

// Guruh a’zolari
router.get('/:groupId/members', authMiddleware, groupController.getGroupMembers);

// 📌 Admin uchun
router.get('/all', authMiddleware, groupController.getAllGroups);
router.delete('/:groupId', authMiddleware, groupController.deleteGroup);
router.put('/:groupId', authMiddleware, groupController.updateGroup);

module.exports = router;
