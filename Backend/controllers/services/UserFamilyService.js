import UserFamilyDetails from "../../models/UserFamilyDetails.js";

export const createUserFamilyService = async (payload) => {
  const {
    userId,
    fatherName,
    motherName,
    fatherOccupation,
    motherOccupation,
    noOfBrothers,
    noOfBrothersMarried,
    noOfSisters,
    noOfSistersMarried,
    noOfFamilyMembers,
    familyValue,
    familyDetails,
    familyStatus,
    maternalGotra,
  } = payload;

  const newDetails = await UserFamilyDetails.create({
    userId,
    fatherName,
    motherName,
    fatherOccupation,
    motherOccupation,
    noOfBrothers,
    noOfBrothersMarried,
    noOfSisters,
    noOfSistersMarried,
    noOfFamilyMembers,
    familyValue,
    familyDetails,
    familyStatus,
    maternalGotra,
  });

  return newDetails;
};
export const getUserFamilyService = async (userId) => {
  return await UserFamilyDetails.findAll({ where: { userId } });
};

export const updateUserFamilyService = async (userId, payload) => {
  const familyDetails = await UserFamilyDetails.findOne({ where: { userId } });
  if (!familyDetails) throw new Error("Family details not found");

  await familyDetails.update(payload);
  return familyDetails;
};
