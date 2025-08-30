export const UserFamilyDetailsRequestDTO = {
  fatherName: "string",
  fatherOccupation: "string",
  motherName: "string",
  motherOccupation: "string",
  noOfBrothers: "number",
  noOfBrothersMarried: "number",
  noOfSisters: "number",
  noOfSistersMarried: "number",
  noOfFamilyMembers: "number",
  familyValue: "string",
  familyDetails: "string",
  familyStatus: "string",
  maternalGotra: "string",
};

export const UserFamilyDetailsResponseDTO = {
  status: "boolean",
  message: "string",
  data: "object|null",
};
