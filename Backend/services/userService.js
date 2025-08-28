import bcrypt from "bcrypt";
import UserProfile from "../models/UserProfile.js";

class UserService {
  // Load user by username (mobileNumber)
  async loadUserByUsername(mobileNumber) {
    const user = await UserProfile.findByPk(mobileNumber);
    if (!user) {
      throw new Error(`User with mobile number ${mobileNumber} not found`);
    }
    return user;
  }

  // Optional: validate password
  async validateUser(mobileNumber, password) {
    const user = await this.loadUserByUsername(mobileNumber);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  }
}

export default new UserService();
