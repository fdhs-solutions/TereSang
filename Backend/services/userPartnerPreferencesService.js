import UserPartnerPreferences from "../models/UserPartnerPreferences.js";
import UserProfile from "../models/UserProfile.js";

class UserPartnerPreferencesService {
  async savePreferences(preferences, mobileNumber) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile not found with mobileNumber: ${mobileNumber}`);

    const saved = await UserPartnerPreferences.create({
      ...preferences,
      userId: user.id,
    });

    return { UserPartnerPreferences: saved, status: 200 };
  }

  async getAll(page = 0, size = 10) {
    const offset = page * size;
    const { rows, count } = await UserPartnerPreferences.findAndCountAll({
      offset,
      limit: size,
    });

    return {
      GetUserPartnerPreferences: rows,
      totalElements: count,
      currentPage: page,
      pageSize: size,
      totalPages: Math.ceil(count / size),
      status: rows.length ? 200 : 404,
    };
  }

  async getById(id) {
    const details = await UserPartnerPreferences.findByPk(id);
    if (!details) return { error: `Not found`, status: 404 };
    return { UserPartnerPreferences: details, status: 200 };
  }

  async updatePreferences(mobileNumber, updatedPreferences) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile not found with mobileNumber: ${mobileNumber}`);

    let details = await UserPartnerPreferences.findOne({
      where: { userId: user.id },
    });
    if (!details)
      return { error: `UserPartnerPreferences not found`, status: 404 };

    await details.update(updatedPreferences);
    return { UserPartnerPreferences: details, status: 200 };
  }
}

export default new UserPartnerPreferencesService();
