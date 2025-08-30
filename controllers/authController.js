const User = require('../models/authModels');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 🔑 Token yasash
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// 📌 Register
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email va password majburiy ❌" });
  }

  const userRole = role || "user";

  User.create(name, email, password, userRole, (err, user) => {
    if (err) {
      // SQLITE constraint errorini tekshirish
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ error: "Bu email avvaldan mavjud ❌" });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "User ro'yxatdan o'tdi ✅",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  });
};

// 📌 Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // ✅ validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email va password majburiy ❌" });
  }

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User topilmadi ❌" });

    // parolni tekshirish
    if (user.password !== password) {
      return res.status(401).json({ error: "Parol noto‘g‘ri ❌" });
    }

    // token yaratamiz
    const token = generateToken(user);

    res.json({
      message: "Login muvaffaqiyatli ✅",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  });
};

// 📌 Profilga avatar yuklash
exports.uploadAvatar = (req, res) => {
  const id = req.params.id;
  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!avatarPath) {
    return res.status(400).json({ error: "Rasm yuklanmadi ❌" });
  }

  User.updateAvatar(id, avatarPath, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: "Avatar yangilandi ✅",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  });
};
