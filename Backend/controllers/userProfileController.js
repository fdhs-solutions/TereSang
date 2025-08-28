import bcrypt from "bcryptjs";
import UserProfile from "../models/UserProfile.js";

// POST /create-profile
export const createUserProfile = async (req, res, next) => {
  try {
    const { mobileNumber, firstName, lastName, password } = req.body;

    if (!mobileNumber || !firstName || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile number, first name, and password are required",
      });
    }

    const existingUser = await UserProfile.findOne({ where: { mobileNumber } });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Mobile number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = await UserProfile.create({
      mobileNumber,
      firstName,
      lastName,
      password: hashedPassword,
      profileImage: req.file?.filename, // if using multer for file upload
    });

    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

// GET /login-profile?mobileNumber=&password=
export const loginProfile = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.query;

    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    res.json({ success: true, message: "Login successful", data: user });
  } catch (err) {
    next(err);
  }
};

// PUT /update-profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { mobileNumber, ...data } = req.body;
    if (!mobileNumber)
      return res
        .status(400)
        .json({ success: false, message: "Mobile number is required" });

    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (data.password) data.password = await bcrypt.hash(data.password, 10); // hash password if updated

    await user.update(data);
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (err) {
    next(err);
  }
};
