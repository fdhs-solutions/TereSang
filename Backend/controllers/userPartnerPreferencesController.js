import UserPartnerPreferencesService from "../services/userPartnerPreferencesService.js";

class UserPartnerPreferencesController {
  async save(req, res) {
    try {
      const result = await UserPartnerPreferencesService.savePreferences(
        req.body,
        req.params.mobileNumber
      );
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const result = await UserPartnerPreferencesService.getAll(page, size);
    res.status(result.status).json(result);
  }

  async getById(req, res) {
    const result = await UserPartnerPreferencesService.getById(req.params.id);
    res.status(result.status).json(result);
  }

  async update(req, res) {
    try {
      const result = await UserPartnerPreferencesService.updatePreferences(
        req.params.mobileNumber,
        req.body
      );
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UserPartnerPreferencesController();
