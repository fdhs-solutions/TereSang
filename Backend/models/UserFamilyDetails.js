import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserProfile from "./UserProfile.js";

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

UserProfile.hasOne(UserFamilyDetails, { foreignKey: "userId" });
UserFamilyDetails.belongsTo(UserProfile, { foreignKey: "userId" });

export default UserFamilyDetails;
