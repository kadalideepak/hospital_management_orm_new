const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// CRUD routes
router.post("/", patientController.createPatient);
router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

// Extra filter routes
router.get("/gender/:gender", patientController.getPatientsByGender);
router.get("/status/:status", patientController.getPatientsByStatus);
router.get("/user/:user_id", patientController.getPatientsByUserId);

module.exports = router;
