import bcrypt from "bcryptjs";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Register User Service
export const registerUserService = async (payload) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    age,
    gender,
    dob,
    password,
    confirmPassword,
    religion,
    community,
    residence,
    mailId, // payload field
    profileImage, // binary
    extension, // file extension if uploaded
  } = payload;

  // ✅ Validate required fields
  if (!mobileNumber) throw new Error("Mobile number is required");
  if (!password) throw new Error("Password is required");
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  // ✅ Check if user exists
  const existingUser = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (existingUser)
    throw new Error("User with this mobile number already exists");

  // ✅ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Create user
  const newUser = await UserRegistrationProfile.create({
    firstName,
    lastName,
    mobileNumber,
    age,
    gender,
    dob,
    password: hashedPassword,
    religion,
    community,
    residence,
    userMailId: mailId, // map payload → model
    profileImage,
    extension,
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

  return { status: 200, user };
};
