const db = require('../config/db');
const MonthStudent = require('./monthStudentModel'); // qo‘shildi

// Jadvalni yaratish (agar yo‘q bo‘lsa)
db.run(`
  CREATE TABLE IF NOT EXISTS months (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    finished BOOLEAN DEFAULT 0,
    topStudent TEXT,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  )
`);

// Oy yaratish
exports.createMonth = (groupId, name, callback) => {
  const sql = `INSERT INTO months (group_id, name, finished, topStudent) VALUES (?, ?, 0, NULL)`;
  db.run(sql, [groupId, name], function (err) {
    if (err) return callback(err);

    const monthId = this.lastID;

    // 🔥 Guruhdagi barcha studentlarni avtomatik oyga qo‘shish
    MonthStudent.addStudentsToMonth(monthId, groupId, (err2) => {
      if (err2) return callback(err2);

      callback(null, { 
        id: monthId, 
        groupId, 
        name, 
        finished: 0, 
        topStudent: null 
      });
    });
  });
};

// Guruhdagi barcha oylarni olish
exports.getMonthsByGroup = (groupId, callback) => {
  const sql = `SELECT * FROM months WHERE group_id = ?`;
  db.all(sql, [groupId], callback);
};

// Bitta oyni olish
exports.getMonthById = (monthId, callback) => {
  const sql = `SELECT * FROM months WHERE id = ?`;
  db.get(sql, [monthId], callback);
};

// Oy yangilash (masalan tugatish, topStudent qo‘yish)
exports.updateMonth = (id, { finished, topStudent }, callback) => {
  const sql = `UPDATE months SET finished = ?, topStudent = ? WHERE id = ?`;
  db.run(sql, [finished, topStudent, id], function (err) {
    callback(err, { changes: this?.changes });
  });
};

// Oy o‘chirish
exports.deleteMonth = (id, callback) => {
  const sql = `DELETE FROM months WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err, { changes: this?.changes });
  });
};
