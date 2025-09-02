const db = require("../config/db");

// Jadval yaratish
db.run(`
  CREATE TABLE IF NOT EXISTS month_students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    FOREIGN KEY (month_id) REFERENCES months(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

const MonthStudent = {
  // Guruhdagi studentlarni avtomatik qo‘shish
  addStudentsToMonth: (monthId, groupId, callback) => {
    db.all(`SELECT user_id FROM group_users WHERE group_id = ?`, [groupId], (err, rows) => {
      if (err) return callback(err);

      if (!rows.length) return callback(null); // Agar student bo‘lmasa

      const stmt = db.prepare(`
        INSERT INTO month_students (month_id, user_id, score) VALUES (?, ?, 0)
      `);

      rows.forEach((row) => {
        stmt.run(monthId, row.user_id);
      });

      stmt.finalize();
      callback(null);
    });
  },

  // Oy ichidagi studentlarni olish
  getMonthStudents: (monthId, callback) => {
    db.all(
      `SELECT u.id, u.name, ms.score
       FROM month_students ms
       JOIN users u ON ms.user_id = u.id
       WHERE ms.month_id = ?`,
      [monthId],
      callback
    );
  },

  // Studentning bahosini yangilash
  updateScore: (monthId, userId, score, callback) => {
    db.run(
      `UPDATE month_students SET score = ? WHERE month_id = ? AND user_id = ?`,
      [score, monthId, userId],
      function (err) {
        callback(err, { changes: this?.changes });
      }
    );
  },
};

module.exports = MonthStudent;
