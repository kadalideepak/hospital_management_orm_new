const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Appointment = require("./appointmentModel");

const Treatment = sequelize.define(
  "Treatment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Appointment,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prescribed_medicine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    follow_up_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ONGOING", "COMPLETED", "CANCELLED"),
      defaultValue: "ONGOING",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Associations
Treatment.belongsTo(Appointment, { foreignKey: "appointment_id" });
Appointment.hasMany(Treatment, { foreignKey: "appointment_id" });

module.exports = Treatment;
