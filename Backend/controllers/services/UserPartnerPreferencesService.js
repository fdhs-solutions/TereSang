import UserPartnerPreferences from "../../models/UserPartnerPreferences.js";

// Create partner preferences
export const createPartnerPreferencesService = async (payload) => {
  return await UserPartnerPreferences.create(payload);
};

// Get partner preferences by userId
export const getUserPartnerPreferencesService = async (userId) => {
  return await UserPartnerPreferences.findOne({ where: { userId } });
};

// Update partner preferences by userId
export const updateUserPartnerPreferencesService = async (userId, payload) => {
  const preferences = await UserPartnerPreferences.findOne({
    where: { userId },
  });
  if (!preferences) return null;
  await preferences.update(payload);
  return preferences;
};
