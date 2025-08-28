import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserRoles = sequelize.define(
  "UserRoles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
  },
  { tableName: "user_roles" }
);

export default UserRoles;
