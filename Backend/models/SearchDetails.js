// models/SearchDetails.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SearchDetails = sequelize.define(
  "SearchDetails",
  {
    sId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    gender: { type: DataTypes.STRING, allowNull: false },
    fromAge: { type: DataTypes.INTEGER, allowNull: false },
    toAge: { type: DataTypes.INTEGER, allowNull: false },
    religion: { type: DataTypes.STRING, allowNull: false },
    motherTongue: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "search_details" }
);

export default SearchDetails;
