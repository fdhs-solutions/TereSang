import UserLifeStyleAndEducation from "../models/UserLifeStyleAndEducation.js";
import UserProfile from "../models/UserProfile.js";

class UserLifeStyleService {
  async saveDetails(details, mobileNumber) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile with mobileNumber ${mobileNumber} not found`);

    const saved = await UserLifeStyleAndEducation.create({
      ...details,
      userId: user.id,
    });

    return { userLifeStyleAndEducation: saved, status: 200 };
  }

  async getAllDetails(page = 0, size = 10) {
    const offset = page * size;
    const { rows, count } = await UserLifeStyleAndEducation.findAndCountAll({
      offset,
      limit: size,
    });

    return {
      UserLifeStyleAndEducationDetails: rows,
      totalElements: count,
      currentPage: page,
      pageSize: size,
      totalPages: Math.ceil(count / size),
      status: rows.length ? 200 : 404,
    };
  }

  async getDetailsById(id) {
    const details = await UserLifeStyleAndEducation.findByPk(id);
    return { UserLifeStyleAndEducationDetailsById: details, status: 200 };
  }

  async updateDetails(mobileNumber, updatedDetails) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile with mobileNumber ${mobileNumber} not found`);

    let details = await UserLifeStyleAndEducation.findOne({
      where: { userId: user.id },
    });
    if (!details)
      return { error: `UserLifeStyleAndEducation not found`, status: 404 };

    await details.update(updatedDetails);
    return { userLifeStyleAndEducation: details, status: 200 };
  }
}

export default new UserLifeStyleService();
