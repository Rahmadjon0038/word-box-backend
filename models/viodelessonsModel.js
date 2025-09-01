const db = require("../config/db");

// Lessons jadvali
const lessonsTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      embed TEXT,
      date TEXT,
      likes INTEGER DEFAULT 0
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
  // Barcha darslarni olish
  getAll: (callback) => {
    db.all("SELECT * FROM lessons", [], (err, rows) => {
      callback(err, rows);
    });
  },

  // ID bo‘yicha olish
  getById: (id, callback) => {
    db.get("SELECT * FROM lessons WHERE id = ?", [id], (err, row) => {
      callback(err, row);
    });
  },

  // Yangi dars qo‘shish
  create: (title, description, embed, date, callback) => {
    db.run(
      "INSERT INTO lessons (title, description, embed, date, likes) VALUES (?, ?, ?, ?, ?)",
      [title, description, embed, date, 0],
      function (err) {
        callback(err, { id: this?.lastID, title, description, embed, date, likes: 0 });
      }
    );
  },

  // Darsni taxrirlash
  update: (id, title, description, embed, date, callback) => {
    db.run(
      "UPDATE lessons SET title = ?, description = ?, embed = ?, date = ? WHERE id = ?",
      [title, description, embed, date, id],
      function (err) {
        callback(err, { id, title, description, embed, date });
      }
    );
  },

  // Like bosish
  like: (id, callback) => {
    db.run("UPDATE lessons SET likes = likes + 1 WHERE id = ?", [id], function (err) {
      if (err) return callback(err);
      db.get("SELECT * FROM lessons WHERE id = ?", [id], (err, row) => {
        callback(err, row);
      });
    });
  },

  delete: (id, callback) => {
    db.run("DELETE FROM lessons WHERE id = ?", [id], function (err) {
      if (err) return callback(err);
      callback(null, { message: "Lesson o‘chirildi ✅", changes: this.changes });
    });
  },
};


lessonsTable(); // jadvalni yaratib qo‘yish

module.exports = Lesson;
