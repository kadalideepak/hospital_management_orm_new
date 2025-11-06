const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

// Custom APIs
// 🚫 Public routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/role/:role", userController.getUsersByRole);
router.get("/status/:status", userController.getUsersByStatus);
// CRUD routes

// ✅ Protected routes
router.post("/", authenticateToken, userController.createUser);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, userController.deleteUser);
// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUserById);

module.exports = router;
