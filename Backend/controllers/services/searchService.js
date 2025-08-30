import { Op } from "sequelize";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Search Users Service
export const searchUsers = async ({
  gender,
  fromAge,
  toAge,
  religion,
  motherTongue,
}) => {
  const users = await UserRegistrationProfile.findAll({
    where: {
      gender,
      age: { [Op.between]: [fromAge, toAge] },
      religion,
      langKnown: motherTongue,
    },
    attributes: { exclude: ["password"] }, // exclude password
  });

  return users;
};
