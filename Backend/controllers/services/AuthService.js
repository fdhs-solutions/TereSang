import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Register User Service
export const registerUserService = async (payload) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    password,
    confirmPassword,
    mailId,
  } = payload;

  if (!mobileNumber) throw new Error("Mobile number is required");
  if (!password) throw new Error("Password is required");
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const existingUser = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (existingUser)
    throw new Error("User with this mobile number already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserRegistrationProfile.create({
    firstName,
    lastName,
    mobileNumber,
    password: hashedPassword,
    userMailId: mailId,
    createdTime: new Date(),
    updatedTime: new Date(),
  });

  return newUser;
};

// Login User Service
export const loginUserService = async ({ mobileNumber, password }) => {
  if (!mobileNumber || !password)
    return { status: 400, message: "Mobile number and password are required" };

  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return { status: 404, message: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, message: "Invalid credentials" };

  // ✅ Generate JWT
  const payload = {
    id: user.id,
    mobileNumber: user.mobileNumber,
  };
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { status: 200, user, jwtToken };
};
