const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authenticateToken = require("../middleware/authMiddleware");

// 🚫 Public routes
router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
// Extra Routes
router.get("/doctor/:doctor_id", appointmentController.getAppointmentsByDoctor);
router.get("/status/:status", appointmentController.getAppointmentsByStatus);

// router.post("/", appointmentController.createAppointment);
// router.put("/:id", appointmentController.updateAppointment);
// router.delete("/:id", appointmentController.deleteAppointment);

// ✅ Protected routes
router.post("/", authenticateToken, appointmentController.createAppointment);
router.put("/:id", authenticateToken, appointmentController.updateAppointment);
router.delete(
  "/:id",
  authenticateToken,
  appointmentController.deleteAppointment
);
module.exports = router;
