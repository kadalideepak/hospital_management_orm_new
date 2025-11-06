const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const authenticateToken = require("../middleware/authMiddleware");

// 🚫 Public routes
router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
// Custom routes
router.get("/user/:user_id", doctorController.getDoctorsByUserId);
router.get(
  "/department/:department_id",
  doctorController.getDoctorsByDepartmentId
);
// router.post("/", doctorController.createDoctor);
// router.put("/:id", doctorController.updateDoctor);
// router.delete("/:id", doctorController.deleteDoctor);

// ✅ Protected routes
router.post("/", authenticateToken, doctorController.createDoctor);
router.put("/:id", authenticateToken, doctorController.updateDoctor);
router.delete("/:id", authenticateToken, doctorController.deleteDoctor);

module.exports = router;
