const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// CRUD Routes
router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

// Extra Routes
router.get("/doctor/:doctor_id", appointmentController.getAppointmentsByDoctor);
router.get("/status/:status", appointmentController.getAppointmentsByStatus);

module.exports = router;
