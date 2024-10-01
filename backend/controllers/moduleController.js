const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new module
const createModule = async (req, res) => {
  const { course_id, module_title, module_number, duration } = req.body;

  try {
    const module = await prisma.module.create({
      data: {
        course_id,
        module_title,
        module_number,
        duration,
      },
    });
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all modules for a specific course
const getModulesByCourse = async (req, res) => {
  const { course_id } = req.params;

  try {
    const modules = await prisma.module.findMany({
      where: { course_id: parseInt(course_id) },
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a module
const updateModule = async (req, res) => {
  const { module_id } = req.params;
  const { module_title, module_number, duration } = req.body;

  try {
    const updatedModule = await prisma.module.update({
      where: { module_id: parseInt(module_id) },
      data: {
        module_title,
        module_number,
        duration,
      },
    });
    res.json(updatedModule);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a module
const deleteModule = async (req, res) => {
  const { module_id } = req.params;

  try {
    await prisma.module.delete({
      where: { module_id: parseInt(module_id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule,
};
