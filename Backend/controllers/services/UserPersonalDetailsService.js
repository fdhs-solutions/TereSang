import UserPersonalDetails from "../../models/UserPersonalDetails.js";
import UserRegistrationProfile from "../../models/UserRegistrationProfile.js";

// Helper: Convert Yes/No to boolean
const convertBooleanFields = (payload) => {
  const booleanFields = ["isPersonDisabled", "isUserStayingAlone"];
  booleanFields.forEach((field) => {
    if (payload[field] !== undefined) {
      payload[field] = payload[field] === "Yes"; // Yes -> true, No -> false
    }
  });
  return payload;
};

// Create
export const createPersonalDetailsService = async (payload) => {
  const convertedPayload = convertBooleanFields(payload);
  return await UserPersonalDetails.create(convertedPayload);
};

// Get by userId
export const getPersonalDetailsService = async (userId) => {
  return await UserPersonalDetails.findOne({ where: { userId } });
};

// Update by mobileNumber
export const updatePersonalDetailsService = async (mobileNumber, payload) => {
  const user = await UserRegistrationProfile.findOne({
    where: { mobileNumber },
  });
  if (!user) return null;

  const convertedPayload = convertBooleanFields(payload);

  let details = await UserPersonalDetails.findOne({
    where: { userId: user.id },
  });
  if (!details) {
    // Create if not exists
    details = await UserPersonalDetails.create({
      userId: user.id,
      ...convertedPayload,
    });
  } else {
    // Update if exists
    await details.update(convertedPayload);
  }

  return details;
};
