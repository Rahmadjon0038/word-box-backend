const db = require('../config/db');

// Products jadvalini yaratish
const productsTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      size TEXT,
      status TEXT DEFAULT 'available'  -- available, sold, returned
    )
  `, (err) => {
    if (err) {
      console.error("Products jadvali yaratilmadi ❌:", err.message);
    } else {
      console.log("Products jadvali yaratildi ✅");
    }
  });
};

const Product = {
  // Yangi maxsulot qo‘shish
  create: (name, price, quantity, size, callback) => {
    const sql = `INSERT INTO products (name, price, quantity, size) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, price, quantity, size], function (err) {
      callback(err, { id: this?.lastID, name, price, quantity, size, status: 'available' });
    });
  },

  // Hamma maxsulotlarni olish
  getAll: (callback) => {
    const sql = `SELECT * FROM products WHERE status = 'available'`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  // ID bo‘yicha o‘chirish
  delete: (id, callback) => {
    const sql = `DELETE FROM products WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, { deletedID: id });
    });
  },

  // Sotildi deb belgilash
  markAsSold: (id, callback) => {
    const sql = `UPDATE products SET status = 'sold' WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, { updatedID: id, status: 'sold' });
    });
  },

  // Qaytarildi deb belgilash
  markAsReturned: (id, callback) => {
    const sql = `UPDATE products SET status = 'returned' WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, { updatedID: id, status: 'returned' });
    });
  },

  // Sotilgan maxsulotlarni olish
  getSold: (callback) => {
    const sql = `SELECT * FROM products WHERE status = 'sold'`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  // Qaytarilgan maxsulotlarni olish
  getReturned: (callback) => {
    const sql = `SELECT * FROM products WHERE status = 'returned'`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },
};

productsTable();

module.exports = Product;
