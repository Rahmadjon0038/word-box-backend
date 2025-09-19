const db = require('../config/db');

// Lesson jadvalini yaratish
const lessonsTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      words INTEGER DEFAULT 0,
      learned INTEGER DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error("Lessons jadvali yaratilmadi ❌:", err.message);
    } else {
      console.log("Lessons jadvali yaratildi ✅");
    }
  });
};

const Lesson = {
  create: (userId, title, callback) => {
    const sql = `INSERT INTO lessons (userId, title, words, learned) VALUES (?, ?, 0, 0)`;
    db.run(sql, [userId, title], function(err) {
      callback(err, { id: this.lastID, userId, title, words: 0, learned: 0 });
    });
  },

  getByUserId: (userId, callback) => {
    const sql = `SELECT * FROM lessons WHERE userId = ?`;
    db.all(sql, [userId], (err, rows) => {
      callback(err, rows);
    });
  },

  getById: (id, userId, callback) => {
    const sql = `SELECT * FROM lessons WHERE id = ? AND userId = ?`;
    db.get(sql, [id, userId], (err, row) => {
      callback(err, row);
    });
  },

  update: (id, userId, data, callback) => {
    const { title, words, learned } = data;
    const sql = `UPDATE lessons SET title = ?, words = ?, learned = ? WHERE id = ? AND userId = ?`;
    db.run(sql, [title, words, learned, id, userId], function(err) {
      callback(err, this.changes);
    });
  },

  delete: (id, userId, callback) => {
    const sql = `DELETE FROM lessons WHERE id = ? AND userId = ?`;
    db.run(sql, [id, userId], function(err) {
      callback(err, this.changes);
    });
  }
};

lessonsTable();
module.exports = Lesson;
