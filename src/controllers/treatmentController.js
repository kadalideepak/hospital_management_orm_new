const Treatment = require("../models/treatmentModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// ✅ Create new treatment
exports.createTreatment = async (req, res) => {
  try {
    const {
      appointment_id,
      description,
      prescribed_medicine,
      follow_up_date,
      status,
    } = req.body;

    const treatment = await Treatment.create({
      appointment_id,
      description,
      prescribed_medicine,
      follow_up_date,
      status,
    });

    res.status(201).json({
      message: "Treatment created successfully",
      treatment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all treatments
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll({
      include: {
        model: Appointment,
        include: [
          {
            model: Doctor,
            include: [{ model: User, attributes: ["id", "name", "email"] }],
            attributes: ["id", "specialization"],
          },
          {
            model: Patient,
            include: [{ model: User, attributes: ["id", "name", "email"] }],
            attributes: ["id", "gender"],
          },
        ],
      },
    });

    res.json(treatments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get treatment by ID
exports.getTreatmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const treatment = await Treatment.findByPk(id, {
      include: {
        model: Appointment,
        include: [
          {
            model: Doctor,
            include: [{ model: User, attributes: ["name", "email"] }],
          },
          {
            model: Patient,
            include: [{ model: User, attributes: ["name", "email"] }],
          },
        ],
      },
    });

    if (!treatment)
      return res.status(404).json({ error: "Treatment not found" });

    res.json(treatment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update treatment
exports.updateTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Treatment.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ error: "Treatment not found" });

    const updatedTreatment = await Treatment.findByPk(id);
    res.json({
      message: "Treatment updated successfully",
      updatedTreatment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete treatment
exports.deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Treatment.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Treatment not found" });

    res.json({ message: "Treatment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get treatments by status
exports.getTreatmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const treatments = await Treatment.findAll({
      where: { status },
      include: [
        {
          model: Appointment,
          include: [
            {
              model: Doctor,
              include: [{ model: User, attributes: ["name"] }],
            },
            {
              model: Patient,
              include: [{ model: User, attributes: ["name"] }],
            },
          ],
        },
      ],
    });

    res.json(treatments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get treatments by appointment
exports.getTreatmentsByAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const treatments = await Treatment.findAll({
      where: { appointment_id },
      include: [
        {
          model: Appointment,
          include: [
            {
              model: Doctor,
              include: [{ model: User, attributes: ["name"] }],
            },
            {
              model: Patient,
              include: [{ model: User, attributes: ["name"] }],
            },
          ],
        },
      ],
    });

    res.json(treatments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
