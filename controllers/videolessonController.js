const Lesson = require("../models/viodelessonsModel");

// GET /api/lessons
exports.getLessons = (req, res) => {
  Lesson.getAll((err, lessons) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(lessons);
  });
};

// GET /api/lessons/:id
exports.getLessonById = (req, res) => {
  Lesson.getById(req.params.id, (err, lesson) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!lesson) return res.status(404).json({ error: "Lesson topilmadi" });
    res.json(lesson);
  });
};

// POST /api/lessons
exports.addLesson = (req, res) => {
  const { title, description, embed, date } = req.body;
  if (!title || !embed || !date) {
    return res.status(400).json({ error: "Title, embed va date majburiy" });
  }

  Lesson.create(title, description, embed, date, (err, lesson) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(lesson);
  });
};

// PUT /api/lessons/:id
exports.updateLesson = (req, res) => {
  const { title, description, embed, date } = req.body;
  Lesson.update(req.params.id, title, description, embed, date, (err, lesson) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(lesson);
  });
};

// POST /api/lessons/:id/like
exports.likeLesson = (req, res) => {
  Lesson.like(req.params.id, (err, lesson) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(lesson);
  });
};

// DELETE /api/lessons/:id
exports.deleteLesson = (req, res) => {
  Lesson.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) {
      return res.status(404).json({ error: "Lesson topilmadi" });
    }
    res.json(result);
  });
};


// GET /api/lessons/count
exports.getLessonCount = (req, res) => {
  Lesson.count((err, total) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total });
  });
};

