// models/UserLifeStyleAndEducation.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserRegistrationProfile from "./UserRegistrationProfile.js"; // default import

const UserLifeStyleAndEducation = sequelize.define(
  "UserLifeStyleAndEducation",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    qualification: DataTypes.STRING,
    userOccupation: DataTypes.STRING,
    userCurrentLoc: DataTypes.STRING,
    drinking: DataTypes.STRING,
    smoking: DataTypes.STRING,
    diet: DataTypes.STRING,
  },
  { tableName: "user_life_style_education" }
);

// Association with UserRegistrationProfile
UserRegistrationProfile.hasOne(UserLifeStyleAndEducation, {
  foreignKey: "userId",
});
UserLifeStyleAndEducation.belongsTo(UserRegistrationProfile, {
  foreignKey: "userId",
});

export default UserLifeStyleAndEducation;
