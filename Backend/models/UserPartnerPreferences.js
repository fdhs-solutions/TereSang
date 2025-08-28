import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserProfile from "./UserProfile.js";

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

// Association with UserProfile
UserProfile.hasOne(UserPartnerPreferences, { foreignKey: "userId" });
UserPartnerPreferences.belongsTo(UserProfile, { foreignKey: "userId" });

export default UserPartnerPreferences;
