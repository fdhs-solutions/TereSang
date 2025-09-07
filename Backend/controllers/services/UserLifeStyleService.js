// services/userLifeStyleService.js
import UserLifeStyleAndEducation from "../../models/UserLifeStyleAndEducation.js";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Create lifestyle details
export const createUserLifeStyleService = async (payload) => {
  return await UserLifeStyleAndEducation.create(payload);
};

// Get lifestyle details by userId
export const getUserLifeStyleService = async (userId) => {
  return await UserLifeStyleAndEducation.findOne({ where: { userId } });
};

// Update lifestyle details by mobileNumber
export const updateUserLifeStyleService = async (mobileNumber, payload) => {
  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return null;

  let lifestyle = await UserLifeStyleAndEducation.findOne({
    where: { userId: user.id },
  });
  if (!lifestyle) {
    // Create if not exists
    lifestyle = await UserLifeStyleAndEducation.create({
      userId: user.id,
      ...payload,
    });
  } else {
    // Update if exists
    await lifestyle.update(payload);
  }
  return lifestyle;
};
