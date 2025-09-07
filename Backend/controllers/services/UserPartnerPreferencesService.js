import UserPartnerPreferences from "../../models/UserPartnerPreferences.js";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Create partner preferences
export const createPartnerPreferencesService = async (payload) => {
  return await UserPartnerPreferences.create(payload);
};

// Get partner preferences by mobileNumber
export const getUserPartnerPreferencesService = async (mobileNumber) => {
  const user = await UserRegistrationProfile.findOne({ where: { mobileNumber } });
  if (!user) return null;
  return await UserPartnerPreferences.findOne({ where: { userId: user.id } });
};

// Update partner preferences by mobileNumber
export const updateUserPartnerPreferencesService = async (mobileNumber, payload) => {
  const user = await UserRegistrationProfile.findOne({ where: { mobileNumber } });
  if (!user) return null;
  let preferences = await UserPartnerPreferences.findOne({
    where: { userId: user.id },
  });
  if (!preferences) {
    preferences = await UserPartnerPreferences.create({
      userId: user.id,
      ...payload,
    });
  } else {
    await preferences.update(payload);
  }
  return preferences;
};
