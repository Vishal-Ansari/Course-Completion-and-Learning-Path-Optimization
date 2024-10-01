const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Enroll user in a course
const enrollUser = async (req, res) => {
  const { course_id } = req.body;
  const user_id = req.user.user_id; // Get user_id from token

  try {
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        user_id,
        course_id,
        modules_completed: 0,
        completion_percentage: 0,
        completion_status: "not_started",
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all enrollments for a user
const getUserEnrollments = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const enrollments = await prisma.courseEnrollment.findMany({
      where: { user_id },
      include: {
        course: true, // Include course details
      },
    });

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  enrollUser,
  getUserEnrollments,
};
