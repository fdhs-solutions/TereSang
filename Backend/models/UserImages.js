import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserProfile from "./UserProfile.js";

const UserImage = sequelize.define(
  "UserImage",
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

// Associations
UserProfile.hasOne(UserImage, { foreignKey: "userId" });
UserImage.belongsTo(UserProfile, { foreignKey: "userId" });

export default UserImage;
