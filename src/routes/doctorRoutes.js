const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.post("/", doctorController.createDoctor);
router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.put("/:id", doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);

// Custom routes
router.get("/user/:user_id", doctorController.getDoctorsByUserId);
router.get(
  "/department/:department_id",
  doctorController.getDoctorsByDepartmentId
);

module.exports = router;
