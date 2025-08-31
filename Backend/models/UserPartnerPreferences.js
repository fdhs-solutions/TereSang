// models/UserPartnerPreferences.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserRegistrationProfile from "./UserRegistrationProfile.js"; // default import

const UserPartnerPreferences = sequelize.define(
  "UserPartnerPreferences",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    familyStatus: DataTypes.STRING,
    familyValue: DataTypes.STRING,
    preferredLocation: DataTypes.STRING,
    desiredJobValue: DataTypes.STRING,
    anyOtherPreferences: DataTypes.STRING,
  },
  { tableName: "user_partner_preferences" }
);

// Association with UserRegistrationProfile
UserRegistrationProfile.hasOne(UserPartnerPreferences, {
  foreignKey: "userId",
});
UserPartnerPreferences.belongsTo(UserRegistrationProfile, {
  foreignKey: "userId",
});

export default UserPartnerPreferences;
