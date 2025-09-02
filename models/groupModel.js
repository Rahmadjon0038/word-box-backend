const db = require('../config/db');

// Guruhlar jadvali
const groupsTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      teacher TEXT,
      month_students INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (DATE('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS group_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id INTEGER,
      user_id INTEGER,
      FOREIGN KEY (group_id) REFERENCES groups(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
};

const Group = {
  // Guruh yaratish
  create: (name, description, teacher, callback) => {
    const sql = `INSERT INTO groups (name, description, teacher) VALUES (?, ?, ?)`;
    db.run(sql, [name, description, teacher], function (err) {
      callback(err, {
        id: this?.lastID,
        name,
        description,
        teacher,
        students: 0
      });
    });
  },

  // Guruhga user qo‘shish
  addUserToGroup: (groupId, userId, callback) => {
    const sql = `INSERT INTO group_users (group_id, user_id) VALUES (?, ?)`;
    db.run(sql, [groupId, userId], function (err) {
      if (err) return callback(err);

      // students sonini +1 qilish
      db.run(
        `UPDATE groups SET students = students + 1 WHERE id = ?`,
        [groupId],
        () => {
          callback(err, { groupId, userId });
        }
      );
    });
  },

  // Foydalanuvchining guruhlari
  getUserGroups: (userId, callback) => {
    const sql = `
      SELECT g.id, g.name, g.description, g.teacher, g.students, g.createdAt
      FROM groups g
      JOIN group_users gu ON g.id = gu.group_id
      WHERE gu.user_id = ?
    `;
    db.all(sql, [userId], (err, rows) => {
      callback(err, rows);
    });
  },

  // Guruh a’zolari
  getGroupMembers: (groupId, callback) => {
    const sql = `
      SELECT u.id, u.name, u.email, u.avatar
      FROM users u
      JOIN group_users gu ON u.id = gu.user_id
      WHERE gu.group_id = ?
    `;
    db.all(sql, [groupId], (err, rows) => {
      callback(err, rows);
    });
  },

  // 📌 Admin uchun
  getAllGroups: (callback) => {
    const sql = `SELECT id, name, teacher, students, createdAt FROM groups`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  deleteGroup: (groupId, callback) => {
    const sql = `DELETE FROM groups WHERE id = ?`;
    db.run(sql, [groupId], function (err) {
      callback(err, { deleted: this?.changes });
    });
  },

  updateGroup: (groupId, name, description, teacher, callback) => {
    const sql = `UPDATE groups SET name = ?, description = ?, teacher = ? WHERE id = ?`;
    db.run(sql, [name, description, teacher, groupId], function (err) {
      callback(err, {
        updated: this?.changes,
        id: groupId,
        name,
        description,
        teacher
      });
    });
  }
};

groupsTable();
module.exports = Group;
