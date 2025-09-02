const MonthStudent = require("../models/monthStudentModel");

// 🔹 Oy ichidagi barcha studentlarni olish
exports.getMonthStudents = (req, res) => {
  const { monthId } = req.params;

  MonthStudent.getMonthStudents(monthId, (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    res.json(rows);
  });
};

// 🔹 Studentning bahosini yangilash
exports.updateScore = (req, res) => {
  const { monthId, userId } = req.params;
  const { score } = req.body;

  MonthStudent.updateScore(monthId, userId, score, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (result.changes === 0) {
      return res.status(404).json({ message: "Student not found in this month" });
    }

    res.json({ message: "Score updated successfully", score });
  });
};
