const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

// CRUD Routes
router.post("/", billController.createBill);
router.get("/", billController.getAllBills);
router.get("/:id", billController.getBillById);
router.put("/:id", billController.updateBill);
router.delete("/:id", billController.deleteBill);

// Extra Routes
router.get("/patient/:patient_id", billController.getBillsByPatientId);
router.get("/payment/:payment_method", billController.getBillsByPaymentMethod);
router.get("/status/:status", billController.getBillsByStatus);

module.exports = router;
