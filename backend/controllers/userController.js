const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const registerUser = async (req, res) => {
  const { name, email, password, role = 'employee' } = req.body;
    console.log(req.body)
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Send the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



let options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user is an employee
    if (user.role !== "employee") {
      return res.status(403).json({ message: "Access denied: Admins cannot log in as employees." });
    }

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { user_id: req.user.user_id } });

  if (user) {
    res.json(user);
  } else {
    res.status(204).json({ message: "User not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
