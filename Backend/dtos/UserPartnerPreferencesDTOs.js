export const UserPartnerPreferencesRequestDTO = {
  familyStatus: "string",
  familyValue: "string",
  preferredLocation: "string",
  desiredJobValue: "string",
  anyOtherPreferences: "string",
};

export const UserPartnerPreferencesResponseDTO = {
  status: "boolean",
  message: "string",
  data: "object|null",
};
