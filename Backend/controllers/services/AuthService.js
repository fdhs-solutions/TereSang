import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// ✅ Register User Service
export const registerUserService = async (payload) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    age,
    gender,
    langKnown,
    password,
    confirmPassword,
    community,
    residence,
    religion,
    dob,
    mailId,
    profileImage,
    extension,
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
    age,
    gender,
    langKnown,
    password: hashedPassword,
    community,
    residence,
    religion,
    dob,
    userMailId: mailId,
    profileImage,
    extension,
    createdTime: new Date(),
    updatedTime: new Date(),
  });

  return newUser;
};

// ✅ Login User Service
export const loginUserService = async ({ mobileNumber, password }) => {
  if (!mobileNumber || !password)
    return { status: 400, message: "Mobile number and password are required" };

  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return { status: 404, message: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, message: "Invalid credentials" };

  // Generate JWT
  const jwtToken = jwt.sign(
    { id: user.id, mobileNumber: user.mobileNumber },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { status: 200, user, jwtToken };
};

// Update primary details service
export const updatePrimaryDetailsService = async (mobileNumber, payload) => {
  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return null;

  // If password is being updated, hash it
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  // Update the user
  await user.update({
    ...payload,
    updatedTime: new Date(),
  });

  return user;
};

// Change password service
export const changePasswordService = async (mobileNumber, oldPassword, newPassword) => {
  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return { status: 404, message: "User not found" };

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return { status: 401, message: "Old password is incorrect" };

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hashedNewPassword,
    updatedTime: new Date(),
  });

  return { status: 200, message: "Password changed successfully" };
};
