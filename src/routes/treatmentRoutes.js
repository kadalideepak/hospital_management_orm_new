const express = require("express");
const router = express.Router();
const treatmentController = require("../controllers/treatmentController");
const authenticateToken = require("../middleware/authMiddleware");

// 🚫 Public routes
router.get("/", treatmentController.getAllTreatments);
router.get("/:id", treatmentController.getTreatmentById);
// Extra Routes
router.get("/status/:status", treatmentController.getTreatmentsByStatus);
router.get(
  "/appointment/:appointment_id",
  treatmentController.getTreatmentsByAppointment
);
// router.post("/", treatmentController.createTreatment);
// router.put("/:id", treatmentController.updateTreatment);
// router.delete("/:id", treatmentController.deleteTreatment);

// ✅ Protected routes
router.post("/", authenticateToken, treatmentController.createTreatment);
router.put("/:id", authenticateToken, treatmentController.updateTreatment);
router.delete("/:id", authenticateToken, treatmentController.deleteTreatment);

module.exports = router;
