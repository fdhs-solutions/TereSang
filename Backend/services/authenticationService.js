import bcrypt from "bcryptjs";
import UserProfile from "../models/UserProfile.js";
import UserRoles from "../models/UserRoles.js";

export const createProfile = async (data) => {
  const { mobileNumber, password, profileImage, gallery, ...rest } = data;

  const existingUser = await UserProfile.findByPk(mobileNumber);
  if (existingUser)
    throw new Error(
      `Profile with mobile number ${mobileNumber} already exists.`
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserProfile.create({
    mobileNumber,
    password: hashedPassword,
    profileImage,
    ...rest,
    createdTime: new Date(),
  });

  if (gallery.length > 0 && user) {
    for (let img of gallery) {
      await UserRoles.create({
        mobileNumber,
        role: "GALLERY_IMAGE",
      });
    }
  }

  return { status: 201, message: "Profile created successfully", mobileNumber };
};

export const login = async ({ mobileNumber, password }) => {
  const user = await UserProfile.findOne({ where: { mobileNumber } });
  if (!user) return { status: 404, message: "User not found" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { status: 401, message: "Invalid password" };

  return {
    status: 200,
    message: "Login successful",
    user: { mobileNumber, firstName: user.firstName, lastName: user.lastName },
  };
};
