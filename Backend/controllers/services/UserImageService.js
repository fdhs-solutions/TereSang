import { UserImages } from "../../models/UserImages.js";

export const uploadUserImagesService = async (userId, images) => {
  const imageRecords = await Promise.all(
    images.map((buffer) => UserImages.create({ userId, image: buffer }))
  );
  return imageRecords;
};

export const getUserImagesService = async (userId) => {
  return await UserImages.findAll({ where: { userId } });
};
