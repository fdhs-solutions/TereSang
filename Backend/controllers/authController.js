import jwt from "jsonwebtoken";
import UserService from "../services/userService.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRATION = "1d";

class AuthController {
  async login(req, res) {
    try {
      const { mobileNumber, password } = req.body;
      const user = await UserService.validateUser(mobileNumber, password);

      const token = jwt.sign({ mobileNumber: user.mobileNumber }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      res.status(200).json({
        USER_NAME: user.mobileNumber,
        FULL_NAME: `${user.firstName} ${user.lastName}`,
        JWT_TOKEN: token,
        status: "success",
        statusCode: 200,
        message: "User logged in successfully",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new AuthController();
