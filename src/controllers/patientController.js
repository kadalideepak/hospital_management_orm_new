const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// ✅ Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const { user_id, date_of_birth, gender, contact_number, status } = req.body;

    const patient = await Patient.create({
      user_id,
      date_of_birth,
      gender,
      contact_number,
      status,
    });

    res.status(201).json({
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all patients (with user info)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role", "status"],
        },
      ],
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role", "status"],
        },
      ],
    });

    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update patient
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Patient.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ error: "Patient not found" });

    const updatedPatient = await Patient.findByPk(id);
    res.json({ message: "Patient updated successfully", updatedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Patient not found" });

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Filter by gender
exports.getPatientsByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const patients = await Patient.findAll({ where: { gender } });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Filter by status
exports.getPatientsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const patients = await Patient.findAll({ where: { status } });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Filter by user ID
exports.getPatientsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const patients = await Patient.findAll({ where: { user_id } });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
