import { Op } from "sequelize";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Get all profiles with pagination (exclude profileImage)
export const getAllProfilesService = async ({
  page = 0,
  size = 10,
  gender,
}) => {
  const offset = page * size;
  const limit = size;

  const whereClause = {};
  if (gender) {
    whereClause.gender = { [Op.ne]: gender }; // exclude same gender if provided
  }

  const { rows, count } = await UserRegistrationProfile.findAndCountAll({
    attributes: [
      "id",
      "mobileNumber",
      "firstName",
      "lastName",
      "age",
      "gender",
      "langKnown",
      "community",
      "residence",
      "religion",
      "dob",
      "userMailId",
      "extension",
      "createdTime",
      "updatedTime",
      // profileImage is excluded intentionally
    ],

    where: whereClause,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    result: rows,
    totalPages: Math.ceil(count / size),
  };
};

// Get profile by ID
export const getProfileByIdService = async (userId) => {
  return await UserRegistrationProfile.findByPk(userId);
};

// Get profile by mobile number (full details including image if needed)
export const getProfileByMobileNumberService = async (mobileNumber) => {
  return await UserRegistrationProfile.findOne({ where: { mobileNumber } });
};

// Get only profile image by mobile number
export const getProfileImageByMobileNumberService = async (mobileNumber) => {
  const user = await UserRegistrationProfile.findOne({
    attributes: ["mobileNumber", "profileImage"], // Only these fields
    where: { mobileNumber },
  });

  if (!user) return null;

  return {
    mobileNumber: user.mobileNumber,
    profileImage: user.profileImage || null,
  };
};
