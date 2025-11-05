const Bill = require("../models/billModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// ✅ Create new bill
exports.createBill = async (req, res) => {
  try {
    const { patient_id, total_amount, payment_method, status } = req.body;

    const bill = await Bill.create({
      patient_id,
      total_amount,
      payment_method,
      status,
    });

    res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      include: {
        model: Patient,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get bill by ID
exports.getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByPk(id, {
      include: {
        model: Patient,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    });

    if (!bill) return res.status(404).json({ error: "Bill not found" });

    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update bill
exports.updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Bill.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ error: "Bill not found" });

    const updatedBill = await Bill.findByPk(id);
    res.json({
      message: "Bill updated successfully",
      updatedBill,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete bill
exports.deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Bill.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Bill not found" });

    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get bills by Patient ID
exports.getBillsByPatientId = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const bills = await Bill.findAll({
      where: { patient_id },
      include: {
        model: Patient,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    });

    if (bills.length === 0)
      return res
        .status(404)
        .json({ message: "No bills found for this patient" });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get bills by payment method
exports.getBillsByPaymentMethod = async (req, res) => {
  try {
    const { payment_method } = req.params;
    const bills = await Bill.findAll({
      where: { payment_method },
      include: {
        model: Patient,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get bills by status
exports.getBillsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const bills = await Bill.findAll({
      where: { status },
      include: {
        model: Patient,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    });

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
