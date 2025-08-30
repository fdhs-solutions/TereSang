export const UserLifeStyleRequestDTO = {
  qualification: "string",
  userOccupation: "string",
  userCurrentLoc: "string",
  drinking: "string",
  smoking: "string",
  diet: "string",
};

export const UserLifeStyleResponseDTO = {
  status: "boolean",
  message: "string",
  data: "object|null",
};
