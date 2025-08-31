// models/UserImages.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserRegistrationProfile from "./UserRegistrationProfile.js";

const UserImages = sequelize.define(
  "UserImages",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image1: DataTypes.BLOB("long"),
    image2: DataTypes.BLOB("long"),
    image3: DataTypes.BLOB("long"),
    image4: DataTypes.BLOB("long"),
    image5: DataTypes.BLOB("long"),
    image6: DataTypes.BLOB("long"),
    image7: DataTypes.BLOB("long"),
    image8: DataTypes.BLOB("long"),
    image9: DataTypes.BLOB("long"),
    image10: DataTypes.BLOB("long"),
  },
  { tableName: "user_images" }
);

// Association with UserRegistrationProfile
UserRegistrationProfile.hasOne(UserImages, { foreignKey: "userId" });
UserImages.belongsTo(UserRegistrationProfile, { foreignKey: "userId" });

export default UserImages;
