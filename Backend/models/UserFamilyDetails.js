import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserRegistrationProfile from "./UserRegistrationProfile.js";

const UserFamilyDetails = sequelize.define(
  "UserFamilyDetails",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fatherName: DataTypes.STRING,
    fatherOccupation: DataTypes.STRING,
    motherName: DataTypes.STRING,
    motherOccupation: DataTypes.STRING,
    noOfBrothers: DataTypes.INTEGER,
    noOfBrothersMarried: DataTypes.INTEGER,
    noOfSisters: DataTypes.INTEGER,
    noOfSistersMarried: DataTypes.INTEGER,
    noOfFamilyMembers: DataTypes.INTEGER,
    familyValue: DataTypes.STRING,
    familyDetails: DataTypes.STRING,
    familyStatus: DataTypes.STRING,
    maternalGotra: DataTypes.STRING,
  },
  { tableName: "user_family_details" }
);

// Association with UserRegistrationProfile
UserRegistrationProfile.hasOne(UserFamilyDetails, { foreignKey: "userId" });
UserFamilyDetails.belongsTo(UserRegistrationProfile, { foreignKey: "userId" });

export default UserFamilyDetails;
