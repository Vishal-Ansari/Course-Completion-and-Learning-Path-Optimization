const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Route to create a new course
router.post("/", createCourse);

// Route to get all courses
router.get("/", getAllCourses);

// Route to get a specific course by ID
router.get("/:course_id", getCourseById);

// Route to update a course by ID
router.put("/:course_id", updateCourse);

// Route to delete a course by ID
router.delete("/:course_id", deleteCourse);

module.exports = router;
