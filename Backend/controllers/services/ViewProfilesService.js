import { Op } from "sequelize";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";
import UserPersonalDetails from "../../models/UserPersonalDetails.js";
import UserFamilyDetails from "../../models/UserFamilyDetails.js";
import UserLifeStyleAndEducation from "../../models/UserLifeStyleAndEducation.js";
import UserPartnerPreferences from "../../models/UserPartnerPreferences.js";
import UserImages from "../../models/UserImages.js";

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
    whereClause.gender = {
      [Op.ne]: gender, // not equal to logged-in user gender
    };
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

// New service to get all user details with associated data
export const getAllUserDetailsService = async (mobileNumber) => {
  return await UserRegistrationProfile.findOne({
    where: { mobileNumber },
    include: [
      { model: UserPersonalDetails, as: "UserPersonalDetail" },
      { model: UserFamilyDetails, as: "UserFamilyDetail" },
      { model: UserLifeStyleAndEducation, as: "UserLifeStyleAndEducation" },
      { model: UserPartnerPreferences, as: "UserPartnerPreference" },
      { model: UserImages, as: "UserImage" },
    ],
  });
};
