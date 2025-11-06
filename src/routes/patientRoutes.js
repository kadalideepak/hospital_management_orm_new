const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authenticateToken = require("../middleware/authMiddleware");

// CRUD routes
router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
// Extra filter routes
router.get("/gender/:gender", patientController.getPatientsByGender);
router.get("/status/:status", patientController.getPatientsByStatus);
router.get("/user/:user_id", patientController.getPatientsByUserId);

// router.post("/", patientController.createPatient);
// router.put("/:id", patientController.updatePatient);
// router.delete("/:id", patientController.deletePatient);

// ✅ Protected routes
router.post("/", authenticateToken, patientController.createPatient);
router.put("/:id", authenticateToken, patientController.updatePatient);
router.delete("/:id", authenticateToken, patientController.deletePatient);

module.exports = router;
