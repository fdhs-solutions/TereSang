import UserImage from "../models/UserImages.js";

class ImageService {
  async uploadImages(userId, images) {
    const existing = await UserImage.findOne({ where: { userId } });
    if (existing) throw new Error("Images already exist for this user");

    const imageData = {};
    images.forEach((img, idx) => {
      if (img) imageData[`image${idx + 1}`] = img.buffer;
    });

    const userImage = await UserImage.create({ userId, ...imageData });
    return userImage.id;
  }

  async getImages(userId) {
    const userImage = await UserImage.findOne({ where: { userId } });
    if (!userImage) return [];
    return Object.keys(userImage.dataValues)
      .filter((key) => key.startsWith("image") && userImage[key])
      .map((key) => userImage[key]);
  }

  async updateImage(userId, index, imageBuffer) {
    const userImage = await UserImage.findOne({ where: { userId } });
    if (!userImage) throw new Error("No images found");
    userImage[`image${index}`] = imageBuffer;
    await userImage.save();
    return true;
  }

  async deleteImage(userId, index) {
    const userImage = await UserImage.findOne({ where: { userId } });
    if (!userImage) throw new Error("No images found");
    userImage[`image${index}`] = null;
    await userImage.save();
    return true;
  }
}

export default new ImageService();
