const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Custom APIs
router.get("/role/:role", userController.getUsersByRole);
router.get("/status/:status", userController.getUsersByStatus);

module.exports = router;
