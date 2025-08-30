import bcrypt from "bcryptjs";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Register User Service
export const registerUser = async (payload) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    age,
    gender,
    dob,
    password,
    profileImage,
  } = payload;

  // Check if user exists
  const existingUser = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (existingUser)
    throw new Error("User with this mobile number already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await UserRegistrationProfile.create({
    firstName,
    lastName,
    mobileNumber,
    age,
    gender,
    dob,
    password: hashedPassword,
    profileImage,
  });

  return newUser;
};

// Login User Service
export const loginUser = async ({ mobileNumber, password }) => {
  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return { status: 404, message: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, message: "Invalid credentials" };

  return { status: 200, user };
};
