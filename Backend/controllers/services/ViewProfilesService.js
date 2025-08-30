import { UserRegistrationProfile } from "../../models/UserRegistrationProfile.js";

export const getAllProfilesService = async () => {
  return await UserRegistrationProfile.findAll();
};

export const getProfileByMobileNumberService = async (mobileNumber) => {
  return await UserRegistrationProfile.findOne({ where: { mobileNumber } });
};
