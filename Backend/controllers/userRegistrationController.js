import UserRegistrationService from "../services/userRegistrationService.js";

class UserRegistrationController {
  async createProfile(req, res) {
    try {
      const result = await UserRegistrationService.createProfile(req.body);
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async userLogin(req, res) {
    try {
      const { mobileNumber, password } = req.body;
      const result = await UserRegistrationService.userLogin(
        mobileNumber,
        password
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const result = await UserRegistrationService.updateProfile(req.body);
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await UserRegistrationService.changePassword(
        req.params.mobileNumber,
        oldPassword,
        newPassword
      );
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await UserRegistrationService.deleteUserByMobNum(
        req.params.mobileNumber
      );
      res.status(result.status).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new UserRegistrationController();
