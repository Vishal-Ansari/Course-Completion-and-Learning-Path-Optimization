const express = require("express");
const {
  createEnrollment,
  getEnrollmentsByUser,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

// Route to create a new enrollment
router.post("/", createEnrollment);

// Route to get enrollments for a specific user
router.get("/user/:user_id", getEnrollmentsByUser);

// Route to update an enrollment by ID
router.put("/:enrollment_id", updateEnrollment);

// Route to delete an enrollment by ID
router.delete("/:enrollment_id", deleteEnrollment);

module.exports = router;
