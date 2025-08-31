import UserPersonalDetails from "../../models/UserPersonalDetails.js";

// Create
export const createPersonalDetailsService = async (payload) => {
  return await UserPersonalDetails.create(payload);
};

// Get by userId
export const getPersonalDetailsService = async (userId) => {
  return await UserPersonalDetails.findOne({ where: { userId } });
};

// Update by userId
export const updatePersonalDetailsService = async (userId, payload) => {
  const details = await UserPersonalDetails.findOne({ where: { userId } });
  if (!details) return null;
  await details.update(payload);
  return details;
};
