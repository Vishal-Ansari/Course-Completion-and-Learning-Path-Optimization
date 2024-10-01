const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Assign a course to a user
const assignCourse = async (req, res) => {
  const { user_id, course_id } = req.body;
  const admin_id = req.user.user_id; // Get admin ID from token

  try {
    const assignment = await prisma.courseAssignment.create({
      data: {
        admin_id,
        user_id,
        course_id,
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error("Error assigning course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assignments for an admin
const getAdminAssignments = async (req, res) => {
  const admin_id = req.user.user_id;

  try {
    const assignments = await prisma.courseAssignment.findMany({
      where: { admin_id },
      include: {
        user: true, // Include user details
        course: true, // Include course details
      },
    });

    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  assignCourse,
  getAdminAssignments,
};
