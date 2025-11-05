const Department = require("../models/departmentModel");

// ➕ Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating department", error: error.message });
  }
};

// 📜 Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    if (!departments) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};

// 🔍 Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.status(200).json(department);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching department", error: error.message });
  }
};

// ✏️ Update department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    await department.update(req.body);
    res
      .status(200)
      .json({ message: "Department updated successfully", department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating department", error: error.message });
  }
};

// ❌ Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    await department.destroy();
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};

// 🔎 Filter departments by status (ACTIVE / INACTIVE)
exports.getDepartmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const departments = await Department.findAll({ where: { status } });

    res.status(200).json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering departments", error: error.message });
  }
};
