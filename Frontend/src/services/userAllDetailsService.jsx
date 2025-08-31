import { ProtectedAxiosConfig } from "../config/AxiosConfig"; // ✅ Use protected axios

export const getAllUserDetails = async (mobileNumber) => {
  try {
    const response = await ProtectedAxiosConfig.get(
      `user/get-user-all-details`,
      {
        params: { mobileNumber },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAllProfiles = async (data) => {
  try {
    const response = await ProtectedAxiosConfig.get(`user/profiles`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

export const getProfileImage = async (mobileNumber) => {
  try {
    const response = await ProtectedAxiosConfig.get(`user/profile-image`, {
      params: { mobileNumber },
      responseType: "blob",
    });
    const imageUrl = URL.createObjectURL(response.data);
    return { imageUrl, status: response.status };
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw error;
  }
};
