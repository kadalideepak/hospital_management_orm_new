const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Department = require("../models/departmentModel");

// ➕ Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating doctor", error: error.message });
  }
};

// 📜 Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email", "role", "status"] },
        { model: Department, attributes: ["id", "name", "status"] },
      ],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
};

// 🔍 Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email", "role", "status"] },
        { model: Department, attributes: ["id", "name", "status"] },
      ],
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};

// ✏️ Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.update(req.body);
    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating doctor", error: error.message });
  }
};

// ❌ Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.destroy();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting doctor", error: error.message });
  }
};

// 👨‍⚕️ Get doctors by user_id
exports.getDoctorsByUserId = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { user_id: req.params.user_id },
      include: [{ model: User, attributes: ["id", "name", "email", "status"] }],
    });

    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching doctors by user",
        error: error.message,
      });
  }
};

// 🏥 Get doctors by department_id
exports.getDoctorsByDepartmentId = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { department_id: req.params.department_id },
      include: [{ model: Department, attributes: ["id", "name", "status"] }],
    });

    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching doctors by department",
        error: error.message,
      });
  }
};
