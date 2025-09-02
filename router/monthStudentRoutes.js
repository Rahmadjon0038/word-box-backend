const express = require("express");
const router = express.Router();
const monthStudentController = require("../controllers/monthStudentController");

// 🔹 Oy ichidagi studentlarni olish
router.get("/:monthId/students", monthStudentController.getMonthStudents);

// 🔹 Student bahosini yangilash
router.put("/:monthId/students/:userId", monthStudentController.updateScore);

module.exports = router;
