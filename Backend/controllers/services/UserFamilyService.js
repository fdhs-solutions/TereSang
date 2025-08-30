import UserFamilyDetails from "../../models/UserFamilyDetails.js";

export const createFamilyDetails = async (payload) => {
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
export const getFamilyDetailsByUser = async (userId) => {
  return await UserFamilyDetails.findAll({ where: { userId } });
};
