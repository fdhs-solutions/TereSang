import { UserPartnerPreferences } from "../../models/UserPartnerPreferences.js";

export const createPartnerPreferencesService = async (payload) => {
  const newPreferences = await UserPartnerPreferences.create(payload);
  return newPreferences;
};

export const getPartnerPreferencesByUser = async (userId) => {
  return await UserPartnerPreferences.findOne({ where: { userId } });
};
