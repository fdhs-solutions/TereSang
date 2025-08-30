export const UserPersonalDetailsRequestDTO = {
  birthPlace: "string",
  bloodGroup: "string",
  bodyType: "string",
  complexion: "string",
  gotra: "string",
  hobbies: "string",
  isPersonDisabled: "boolean",
  isUserStayingAlone: "boolean",
  manglik: "string",
  maritalStatus: "string",
  rashi: "string",
  userHeight: "number",
  userWeight: "number",
  userIncome: "number",
};

export const UserPersonalDetailsResponseDTO = {
  status: "boolean",
  message: "string",
  data: "object|null",
};
