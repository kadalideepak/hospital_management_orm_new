const express = require("express");
const router = express.Router();
const treatmentController = require("../controllers/treatmentController");

// CRUD Routes
router.post("/", treatmentController.createTreatment);
router.get("/", treatmentController.getAllTreatments);
router.get("/:id", treatmentController.getTreatmentById);
router.put("/:id", treatmentController.updateTreatment);
router.delete("/:id", treatmentController.deleteTreatment);

// Extra Routes
router.get("/status/:status", treatmentController.getTreatmentsByStatus);
router.get(
  "/appointment/:appointment_id",
  treatmentController.getTreatmentsByAppointment
);

module.exports = router;
