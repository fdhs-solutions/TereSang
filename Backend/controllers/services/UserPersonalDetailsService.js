import { UserPersonalDetails } from "../../models/UserPersonalDetails.js";

export const createPersonalDetailsService = async (payload) => {
  const newDetails = await UserPersonalDetails.create(payload);
  return newDetails;
};

export const getPersonalDetailsByUser = async (userId) => {
  return await UserPersonalDetails.findOne({ where: { userId } });
};
