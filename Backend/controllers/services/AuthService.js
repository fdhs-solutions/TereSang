import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";
import { sendOtp } from "../../utils/mailer.js";

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

  // Normalize date fields: convert valid strings to Date, convert empty/invalid to null or remove
  const dateFields = ["otpExpiration", "dob", "createdTime", "updatedTime"];
  for (const f of dateFields) {
    if (Object.prototype.hasOwnProperty.call(payload, f)) {
      const val = payload[f];

      // Treat empty string as null
      if (val === "" || val === null || typeof val === "undefined") {
        payload[f] = null;
        continue;
      }

      // If already a Date object, check it's valid
      if (val instanceof Date) {
        if (isNaN(val.getTime())) payload[f] = null;
        continue;
      }

      // Try to parse string/number into Date
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        payload[f] = parsed; // Sequelize will send JS Date -> proper SQL datetime
      } else {
        // invalid date string: remove or set null to avoid DB error
        payload[f] = null;
      }
    }
  }

  // Only add profileImage if buffer present (you already do this at controller)
  // Update the user and set updatedTime to now (if you want)
  payload.updatedTime = new Date();

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


const genOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
};

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);


export const forgotPasswordService = async (email) => {
  const user = await UserRegistrationProfile.findOne({ where: { userMailId: email } });
  if (!user) return { success: false, status: 404, message: "User not found" };

  const otp = genOtp();
  const otpExpiration = new Date(Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000);

  // Save OTP & expiry to DB
  await user.update({ otp, otpExpiration, updatedTime: new Date() });

  // send email (will throw if fails)
  await sendOtp(email, user.firstName, otp);

  return { success: true, message: "OTP sent successfully to your email address. Please verify to reset your password." };
};

export const verifyOtpService = async (email, otp) => {
  const user = await UserRegistrationProfile.findOne({ where: { userMailId: email } });
  if (!user) return { success: false, status: 404, message: "User not found" };
  if (!user.otp || !user.otpExpiration) return { success: false, status: 400, message: "No OTP found. Please request a new OTP." };

  if (new Date() > new Date(user.otpExpiration)) {
    return { success: false, status: 401, message: "OTP expired. Please request a new OTP." };
  }

  if (user.otp !== otp.toString()) {
    return { success: false, status: 401, message: "Invalid OTP" };
  }

  // OTP verified -> clear OTP to prevent reuse (optional)
  await user.update({ otp: null, otpExpiration: null, updatedTime: new Date() });

  return { success: true, message: "OTP verified successfully" };
};

export const resetPasswordService = async (email, newPassword) => {
  const user = await UserRegistrationProfile.findOne({ where: { userMailId: email } });
  if (!user) return { success: false, status: 404, message: "User not found" };

  const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await user.update({ password: hashedNewPassword, updatedTime: new Date() });

  return { success: true, message: "Password reset successfully" };
};
