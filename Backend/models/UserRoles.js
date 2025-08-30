import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UserRoles = sequelize.define(
  "UserRoles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: DataTypes.STRING,
    userRegistrationProfileMobileNumber: DataTypes.STRING,
  },
  { tableName: "user_roles" }
);
