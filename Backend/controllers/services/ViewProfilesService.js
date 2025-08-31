import { Op } from "sequelize";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

export const getAllProfilesService = async ({
  page = 0,
  size = 10,
  gender,
}) => {
  const offset = page * size;
  const limit = size;

  const whereClause = {};
  if (gender) {
    // Example: exclude same gender, adjust logic as needed
    whereClause.gender = { [Op.ne]: gender };
  }

  const { rows, count } = await UserRegistrationProfile.findAndCountAll({
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

export const getProfileByIdService = async (userId) => {
  return await UserRegistrationProfile.findByPk(userId);
};

export const getProfileByMobileNumberService = async (mobileNumber) => {
  return await UserRegistrationProfile.findOne({ where: { mobileNumber } });
};

// ✅ New service for only profile image
export const getProfileImageByMobileNumberService = async (mobileNumber) => {
  const user = await UserRegistrationProfile.findOne({
    attributes: ["mobileNumber", "profileImage"], // only required fields
    where: { mobileNumber },
  });

  if (!user) return null;

  return {
    mobileNumber: user.mobileNumber,
    profileImage: user.profileImage || null,
  };
};
