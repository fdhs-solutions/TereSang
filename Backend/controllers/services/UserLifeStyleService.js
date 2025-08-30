import { UserLifeStyleAndEducation } from "../../models/UserLifeStyleAndEducation.js";

export const createLifeStyleService = async (payload) => {
  const newLifeStyle = await UserLifeStyleAndEducation.create(payload);
  return newLifeStyle;
};

export const getLifeStyleByUser = async (userId) => {
  return await UserLifeStyleAndEducation.findOne({ where: { userId } });
};
