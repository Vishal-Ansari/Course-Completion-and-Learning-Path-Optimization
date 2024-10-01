const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new course
const createCourse = async (req, res) => {
  const { title, description, duration, difficulty, total_modules } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        duration,
        difficulty,
        total_modules,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { course_id: parseInt(id) },
    });

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
};
