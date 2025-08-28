import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserProfile from "../models/UserProfile.js";
import UserRoles from "../models/UserRoles.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRATION = "1d";

class UserRegistrationService {
  async createProfile(dto) {
    const existingUser = await UserProfile.findByPk(dto.mobileNumber);
    if (existingUser)
      throw new Error(
        `Profile with mobile number ${dto.mobileNumber} already exists.`
      );

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await UserProfile.create({
      ...dto,
      password: hashedPassword,
      langKnown: dto.langKnown.join(","), // store as CSV
      createdTime: new Date(),
    });

    await UserRoles.create({ role: "USER", mobileNumber: dto.mobileNumber });

    return { message: "Profile created successfully", status: 200 };
  }

  async userLogin(mobileNumber, password) {
    const user = await UserProfile.findByPk(mobileNumber, {
      include: UserRoles,
    });
    if (!user) throw new Error("No user found with the given mobile number");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    const token = jwt.sign({ mobileNumber: user.mobileNumber }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return {
      USER_NAME: user.mobileNumber,
      FULL_NAME: `${user.firstName} ${user.lastName}`,
      gender: user.gender,
      JWT_TOKEN: token,
      USER_ROLES: user.UserRoles.map((r) => r.role),
      status: "success",
      statusCode: 200,
      statusMessage: "User logged in successfully",
    };
  }

  async updateProfile(dto) {
    const user = await UserProfile.findByPk(dto.mobileNumber);
    if (!user) throw new Error("Profile not found");

    await user.update({
      ...dto,
      langKnown: dto.langKnown.join(","),
      updatedTime: new Date(),
    });

    return { message: "Profile updated successfully", status: 200 };
  }

  async changePassword(mobileNumber, oldPassword, newPassword) {
    const user = await UserProfile.findByPk(mobileNumber);
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new Error("Old password is incorrect");

    await user.update({ password: await bcrypt.hash(newPassword, 10) });
    return { message: "Password changed successfully", status: 200 };
  }

  async deleteUserByMobNum(mobileNumber) {
    await UserProfile.destroy({ where: { mobileNumber } });
    return { message: "User deleted successfully", status: 200 };
  }
}

export default new UserRegistrationService();
