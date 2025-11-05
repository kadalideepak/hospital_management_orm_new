const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// ✅ Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor_id, patient_id, appointment_date, reason, status } =
      req.body;

    const appointment = await Appointment.create({
      doctor_id,
      patient_id,
      appointment_date,
      reason,
      status,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "role"],
            },
          ],
          attributes: ["id", "specialization", "status"],
        },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ["id", "name", "email"],
            },
          ],
          attributes: ["id", "gender", "status"],
        },
      ],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get appointment by ID (shows which doctor & patient)
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "role"],
            },
          ],
          attributes: ["id", "specialization", "status"],
        },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ["id", "name", "email"],
            },
          ],
          attributes: ["id", "gender", "status"],
        },
      ],
    });

    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Appointment.update(req.body, { where: { id } });

    if (!updated)
      return res.status(404).json({ error: "Appointment not found" });

    const updatedAppointment = await Appointment.findByPk(id);
    res.json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({ where: { id } });

    if (!deleted)
      return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get appointments by doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const appointments = await Appointment.findAll({
      where: { doctor_id },
      include: [
        {
          model: Patient,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get appointments by status
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const appointments = await Appointment.findAll({
      where: { status },
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
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
