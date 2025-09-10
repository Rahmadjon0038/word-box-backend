const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
router.get("/profile/:userId/stats", profileController.getUserAllLastMonthStats);

module.exports = router;
