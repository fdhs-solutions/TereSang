import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserRoles from "./UserRoles.js";

const UserProfile = sequelize.define(
  "UserProfile",
  {
    mobileNumber: { type: DataTypes.STRING, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    langKnown: DataTypes.STRING, // store as comma separated or JSON
    password: DataTypes.STRING,
    community: DataTypes.STRING,
    residence: DataTypes.STRING,
    religion: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    userMailId: DataTypes.STRING,
    profileImage: DataTypes.BLOB("long"),
    extension: DataTypes.STRING,
    createdTime: DataTypes.DATE,
    updatedTime: DataTypes.DATE,
  },
  { tableName: "user_registration_profile" }
);

// Association
UserProfile.hasMany(UserRoles, { foreignKey: "mobileNumber" });
UserRoles.belongsTo(UserProfile, { foreignKey: "mobileNumber" });

export default UserProfile;
