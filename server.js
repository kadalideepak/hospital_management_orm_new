// server.js
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const departmentRoutes = require("./src/routes/departmentRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes");
const authRoutes = require("./src/routes/authRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const treatmentRoutes = require("./src/routes/treatmentRoutes");
const billRoutes = require("./src/routes/billRoutes");
const authenticateToken = require("./src/middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/departments", departmentRoutes);
app.use("/api/auth", authRoutes);

// ✅ Apply token middleware for all other routes
// app.use(authenticateToken); // this line below all routes have token authentication

// Import routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);
// app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/bills", billRoutes);

// Sync database

sequelize
  .sync({ alter: false })
  .then(() => console.log("✅ Database synced successfully"))
  .catch((err) => console.log("❌ Error syncing database:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// alter: false
