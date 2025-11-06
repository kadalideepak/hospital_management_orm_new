const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const authenticateToken = require("../middleware/authMiddleware");

// 🚫 Public routes
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
// Filter API by status
router.get("/status/:status", departmentController.getDepartmentsByStatus);

// ✅ Protected routes
router.post("/", authenticateToken, departmentController.createDepartment);
router.put("/:id", authenticateToken, departmentController.updateDepartment);
router.delete("/:id", authenticateToken, departmentController.deleteDepartment);

module.exports = router;
