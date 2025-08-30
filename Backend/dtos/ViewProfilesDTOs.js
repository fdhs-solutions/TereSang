export const ViewProfilesRequestDTO = {
  gender: "string",
  fromAge: "number",
  toAge: "number",
  religion: "string",
  motherTongue: "string",
};

export const ViewProfilesResponseDTO = {
  status: "boolean",
  message: "string",
  data: "array|null",
};
