const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/videolessonController");

// Routes
router.get("/", lessonController.getLessons);
router.get("/:id", lessonController.getLessonById);
router.post("/", lessonController.addLesson);
router.put("/:id", lessonController.updateLesson);
router.post("/:id/like", lessonController.likeLesson);
router.delete("/:id", lessonController.deleteLesson);

module.exports = router;
