import ImageService from "../services/imageService.js";

class UserImageController {
  async upload(req, res) {
    try {
      const userId = req.body.userId;
      const images = Array.from(
        { length: 10 },
        (_, i) => req.files[`image${i + 1}`]?.[0]
      );
      const id = await ImageService.uploadImages(userId, images);
      res.status(201).json({ success: true, id });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async get(req, res) {
    try {
      const userId = req.query.userId;
      const images = await ImageService.getImages(userId);
      res.status(200).json({ success: true, images });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { userId, index } = req.body;
      const image = req.file.buffer;
      await ImageService.updateImage(userId, index, image);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { userId, index } = req.body;
      await ImageService.deleteImage(userId, index);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

export default new UserImageController();
