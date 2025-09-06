const express = require("express");
const router = express.Router();

const User = require("../models/authModels");
const Group = require("../models/groupModel");
const Lesson = require("../models/viodelessonsModel");

// Statistikani olish
router.get("/", (req, res) => {
  let stats = {};

  // Users soni
  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: "Userlarni olishda xatolik" });
    stats.users = users.length;

    // Groups soni
    Group.getAllGroups((err, groups) => {
      if (err) return res.status(500).json({ error: "Guruhlarni olishda xatolik" });
      stats.groups = groups.length;

      // Lessons soni
      Lesson.count((err, totalLessons) => {
        if (err) return res.status(500).json({ error: "Darslarni olishda xatolik" });
        stats.lessons = totalLessons;

        res.json(stats); // ✅ natijani qaytaramiz
      });
    });
  });
});

module.exports = router;
