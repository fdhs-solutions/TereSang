export const RegisterUserRequestDTO = {
  firstName: "string",
  lastName: "string",
  mobileNumber: "string",
  age: "number",
  gender: "string",
  password: "string",
  dob: "string",
  profileImage: "Buffer|null",
};

export const LoginRequestDTO = {
  mobileNumber: "string",
  password: "string",
};

export const AuthResponseDTO = {
  status: "boolean",
  message: "string",
  data: "object|null",
};
