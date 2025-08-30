import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserRegistrationProfile } from "./UserRegistrationProfile.js";

export const UserPersonalDetails = sequelize.define(
  "UserPersonalDetails",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    birthPlace: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    bodyType: DataTypes.STRING,
    complexion: DataTypes.STRING,
    gotra: DataTypes.STRING,
    hobbies: DataTypes.STRING,
    isPersonDisabled: DataTypes.BOOLEAN,
    isUserStayingAlone: DataTypes.BOOLEAN,
    manglik: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    rashi: DataTypes.STRING,
    userHeight: DataTypes.FLOAT,
    userWeight: DataTypes.FLOAT,
    userIncome: DataTypes.FLOAT,
  },
  { tableName: "user_personal_details" }
);

// Association with UserRegistrationProfile (matches folder structure)
UserRegistrationProfile.hasOne(UserPersonalDetails, { foreignKey: "userId" });
UserPersonalDetails.belongsTo(UserRegistrationProfile, {
  foreignKey: "userId",
});
