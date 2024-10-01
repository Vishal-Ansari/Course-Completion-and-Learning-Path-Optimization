const express = require("express");
const {
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule,
} = require("../controllers/moduleController");
const router = express.Router();

// Route to create a new module
router.post("/", createModule);

// Route to get modules by course ID
router.get("/:course_id", getModulesByCourse);

// Route to update a module by ID
router.put("/:module_id", updateModule);

// Route to delete a module by ID
router.delete("/:module_id", deleteModule);

module.exports = router;
