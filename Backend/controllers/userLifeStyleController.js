import UserLifeStyleService from "../services/userLifeStyleService.js";

class UserLifeStyleController {
  async save(req, res) {
    try {
      const result = await UserLifeStyleService.saveDetails(
        req.body,
        req.params.mobileNumber
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const result = await UserLifeStyleService.getAllDetails(page, size);
    res.status(result.status).json(result);
  }

  async getById(req, res) {
    const result = await UserLifeStyleService.getDetailsById(req.params.id);
    res.status(result.status).json(result);
  }

  async update(req, res) {
    try {
      const result = await UserLifeStyleService.updateDetails(
        req.params.mobileNumber,
        req.body
      );
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UserLifeStyleController();
