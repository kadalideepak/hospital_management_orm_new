const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// ✅ Create User
// Create User (Sign Up)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, Email, and Password are required" });
    }
    //console.log(password);
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ Save hashed password
      role,
      status,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, password } = req.body;

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only allowed fields
    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
      role: role ?? user.role,
      status: status ?? user.status,
      password: password ?? user.password, // (optional)
    });

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Users by Role (ADMIN, DOCTOR, PATIENT, STAFF)
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findAll({ where: { role } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Users by Status (ACTIVE, INACTIVE)
exports.getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const users = await User.findAll({ where: { status } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
