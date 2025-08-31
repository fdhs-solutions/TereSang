import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

export const getAllProfilesService = async () => {
  return await UserRegistrationProfile.findAll();
};

export const getProfileByIdService = async (userId) => {
  return await UserRegistrationProfile.findByPk(userId);
};

export const getProfileByMobileNumberService = async (mobileNumber) => {
  return await UserRegistrationProfile.findOne({ where: { mobileNumber } });
};
