const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const authenticateToken = require("../middleware/authMiddleware");

// 🚫 Public routes
router.get("/", billController.getAllBills);
router.get("/:id", billController.getBillById);
// Extra Routes
router.get("/patient/:patient_id", billController.getBillsByPatientId);
router.get("/payment/:payment_method", billController.getBillsByPaymentMethod);
router.get("/status/:status", billController.getBillsByStatus);

// router.post("/", billController.createBill);
// router.put("/:id", billController.updateBill);
// router.delete("/:id", billController.deleteBill);

// ✅ Protected routes
router.post("/", authenticateToken, billController.createBill);
router.put("/:id", authenticateToken, billController.updateBill);
router.delete("/:id", authenticateToken, billController.deleteBill);

module.exports = router;
