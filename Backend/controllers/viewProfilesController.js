import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import UserProfile from "../models/UserProfile.js";

// GET /user/profiles
export const viewAllProfiles = async (req, res, next) => {
  try {
    const { gender, page = 0, size = 10, sortBy = "firstName" } = req.query;
    const offset = page * size;

    const whereClause = gender ? { gender } : {};
    const profiles = await UserProfile.findAll({
      where: whereClause,
      order: [[sortBy, "ASC"]],
      limit: parseInt(size),
      offset: parseInt(offset),
    });

    res.json({ success: true, data: profiles });
  } catch (err) {
    next(err);
  }
};

// GET /user/profile-image?mobileNumber=
export const getProfileImage = async (req, res, next) => {
  try {
    const { mobileNumber } = req.query;
    const user = await UserProfile.findOne({ where: { mobileNumber } });

    if (!user || !user.profileImage)
      return res.status(404).json({ message: "Image not found" });

    const imagePath = path.join("uploads", user.profileImage);
    if (!fs.existsSync(imagePath))
      return res.status(404).json({ message: "Image file not found" });

    const imageBuffer = fs.readFileSync(imagePath);
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(imageBuffer);
  } catch (err) {
    next(err);
  }
};

// GET /user/get-user-all-details?mobileNumber=
export const getAllUserDetails = async (req, res, next) => {
  try {
    const { mobileNumber } = req.query;
    const user = await UserProfile.findOne({ where: { mobileNumber } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// POST /user/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { mobileNumber, dateOfBirth } = req.body;

    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Here you can implement sending email / OTP for password reset
    res.json({
      success: true,
      message: `Password reset instructions sent to ${mobileNumber}`,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /user/:mobileNumber/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { mobileNumber } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

// DELETE /user/:mobileNumber/delete-user
export const deleteUser = async (req, res, next) => {
  try {
    const { mobileNumber } = req.params;
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
