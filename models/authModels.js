const db = require('../config/db');

// Users jadvalini yaratish
const usersTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      role TEXT DEFAULT 'user'  -- yangi ustun
    )
  `, (err) => {
    if (err) {
      console.error("Users jadvali yaratilmadi ❌:", err.message);
    } else {
      console.log("Users jadvali yaratildi ✅");
    }
  });
};

const User = {
  // Register (yangi user qo‘shish)
  create: (name, email, password, role, callback) => {
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, email, password, role || 'user'], function (err) {
      callback(err, { id: this?.lastID, name, email, role: role || 'user' });
    });
  },

  // Login (email orqali userni topish)
  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
      callback(err, row);
    });
  },



  // ID bo‘yicha user olish
  getById: (id, callback) => {
    const sql = `SELECT id, name, email, avatar, role FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  },
};

usersTable(); // jadvalni yaratib qo‘yish

module.exports = User;
