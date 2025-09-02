// controllers/monthController.js
const Month = require('../models/monthModel');

// Guruhga oy qo‘shish
exports.createMonth = (req, res) => {
  const { name } = req.body;
  const { groupId } = req.params;

  if (!name) return res.status(400).json({ error: "Oy nomi kerak" });

  Month.createMonth(groupId, name, (err, month) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(month);
  });
};

// Guruhdagi barcha oylarni olish
exports.getMonthsByGroup = (req, res) => {
  const { groupId } = req.params;
  Month.getMonthsByGroup(groupId, (err, months) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(months);
  });
};

// Bitta oyni olish
exports.getMonthById = (req, res) => {
  const { id } = req.params;
  Month.getMonthById(id, (err, month) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!month) return res.status(404).json({ error: "Oy topilmadi" });
    res.json(month);
  });
};

// Oy yangilash
exports.updateMonth = (req, res) => {
  const { id } = req.params;
  const { finished, topStudent } = req.body;

  Month.updateMonth(id, { finished, topStudent }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// Oy o‘chirish
exports.deleteMonth = (req, res) => {
  const { id } = req.params;
  Month.deleteMonth(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
