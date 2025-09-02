const Group = require('../models/groupModel');

// Guruh yaratish
exports.createGroup = (req, res) => {
  const { name, description, teacher } = req.body;

  if (!name || !teacher) {
    return res.status(400).json({ error: "name va teacher majburiy" });
  }

  Group.create(name, description, teacher, (err, group) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Guruh yaratildi", group });
  });
};

// Guruhga user qo‘shish
exports.addUserToGroup = (req, res) => {
  const { groupId, userId } = req.body;

  if (!groupId || !userId) {
    return res.status(400).json({ error: "groupId va userId kerak" });
  }

  Group.addUserToGroup(groupId, userId, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User guruhga qo‘shildi", data });
  });
};

// Userning guruhlari
exports.getUserGroups = (req, res) => {
  const userId = req.user.id;

  Group.getUserGroups(userId, (err, groups) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User guruhlari", groups });
  });
};

// Guruh a’zolari
exports.getGroupMembers = (req, res) => {
  const { groupId } = req.params;

  Group.getGroupMembers(groupId, (err, members) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Guruh a’zolari", members });
  });
};

// 📌 Admin uchun
exports.getAllGroups = (req, res) => {
  Group.getAllGroups((err, groups) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Barcha guruhlar",
      groups
    });
  });
};

exports.deleteGroup = (req, res) => {
  const { groupId } = req.params;

  Group.deleteGroup(groupId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.deleted === 0) {
      return res.status(404).json({ error: "Guruh topilmadi" });
    }
    res.json({ message: "Guruh o‘chirildi", result });
  });
};

exports.updateGroup = (req, res) => {
  const { groupId } = req.params;
  const { name, description, teacher } = req.body;

  if (!name || !teacher) {
    return res.status(400).json({ error: "name va teacher majburiy" });
  }

  Group.updateGroup(groupId, name, description, teacher, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.updated === 0) {
      return res.status(404).json({ error: "Guruh topilmadi" });
    }
    res.json({ message: "Guruh yangilandi", result });
  });
};
