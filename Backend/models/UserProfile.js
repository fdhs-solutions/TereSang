import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // existing PK
    mobileNumber: { type: DataTypes.STRING, unique: true }, // just UNIQUE
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    langKnown: DataTypes.STRING,
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

export default UserProfile;
