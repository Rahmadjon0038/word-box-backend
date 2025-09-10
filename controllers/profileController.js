const Group = require("../models/groupModel");
const Month = require("../models/monthModel");
const MonthStudent = require("../models/monthStudentModel");
const db = require("../config/db");

exports.getUserAllLastMonthStats = (req, res) => {
  const userId = req.params.userId; // yoki token orqali req.user.id

  // 1️⃣ User qaysi guruhlarda borligini topamiz
  Group.getUserGroups(userId, (err, groups) => {
    if (err) return res.status(500).json({ error: "Guruhlarni olishda xatolik" });
    if (!groups.length) return res.status(404).json({ error: "User hech qaysi guruhda emas" });

    let results = [];
    let pending = groups.length;

    groups.forEach((group) => {
      // 2️⃣ Har bir guruhning eng oxirgi oyini olish
      const sql = `SELECT * FROM months WHERE group_id = ? ORDER BY id DESC LIMIT 1`;
      db.get(sql, [group.id], (err2, lastMonth) => {
        if (err2 || !lastMonth) {
          pending--;
          if (pending === 0) res.json({ userId, groups: results });
          return;
        }

        // 3️⃣ O‘sha oy studentlarini olish
        MonthStudent.getMonthStudents(lastMonth.id, (err3, students) => {
          pending--;
          if (!err3 && students) {
            const stats = students.map((s) => ({
              label: s.name,
              value: s.score,
              color: getRandomColor(),
            }));

            results.push({
              group: { id: group.id, name: group.name },
              month: { id: lastMonth.id, name: lastMonth.name },
              stats,
            });
          }

          // 🔚 Hammasi tugagach, response qaytaramiz
          if (pending === 0) {
            res.json({ userId, groups: results });
          }
        });
      });
    });
  });
};

// Rang generator
function getRandomColor() {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return colors[Math.floor(Math.random() * colors.length)];
}
