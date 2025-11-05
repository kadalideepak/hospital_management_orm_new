const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("./patientModel");

const Bill = sequelize.define(
  "Bill",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("CASH", "CARD", "UPI", "INSURANCE"),
      allowNull: false,
      defaultValue: "CASH",
    },
    status: {
      type: DataTypes.ENUM("UNPAID", "PAID", "CANCELLED"),
      allowNull: false,
      defaultValue: "UNPAID",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Association
Bill.belongsTo(Patient, { foreignKey: "patient_id" });
Patient.hasMany(Bill, { foreignKey: "patient_id" });

module.exports = Bill;
