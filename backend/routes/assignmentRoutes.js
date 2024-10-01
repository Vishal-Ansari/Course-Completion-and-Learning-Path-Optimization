const express = require("express");
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

const router = express.Router();

// Route to create a new assignment
router.post("/", createAssignment);

// Route to get all assignments
router.get("/", getAllAssignments);

// Route to get a specific assignment by ID
router.get("/:assignment_id", getAssignmentById);

// Route to update an assignment by ID
router.put("/:assignment_id", updateAssignment);

// Route to delete an assignment by ID
router.delete("/:assignment_id", deleteAssignment);

module.exports = router;
