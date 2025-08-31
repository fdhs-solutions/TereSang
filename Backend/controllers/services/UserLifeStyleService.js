// services/userLifeStyleService.js
import UserLifeStyleAndEducation from "../../models/UserLifeStyleAndEducation.js";

// Create lifestyle details
export const createUserLifeStyleService = async (payload) => {
  return await UserLifeStyleAndEducation.create(payload);
};

// Get lifestyle details by userId
export const getUserLifeStyleService = async (userId) => {
  return await UserLifeStyleAndEducation.findOne({ where: { userId } });
};

// Update lifestyle details by userId
export const updateUserLifeStyleService = async (userId, payload) => {
  const lifestyle = await UserLifeStyleAndEducation.findOne({
    where: { userId },
  });
  if (!lifestyle) return null;
  await lifestyle.update(payload);
  return lifestyle;
};
