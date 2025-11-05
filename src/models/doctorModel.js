const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("./userModel");
const Department = require("./departmentModel");

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "ON_LEAVE", "RETIRED"),
      defaultValue: "AVAILABLE",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relationships
Doctor.belongsTo(User, { foreignKey: "user_id" });
Doctor.belongsTo(Department, { foreignKey: "department_id" });

module.exports = Doctor;
