import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // database user
  process.env.DB_PASS, // database password
  {
    host: process.env.DB_HOST, // database host
    port: process.env.DB_PORT, // database port
    dialect: "mysql",
    logging: false, // set true if you want SQL debug
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected With Database");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  }
};

export { connectDB, sequelize };
