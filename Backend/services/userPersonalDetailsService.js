import UserPersonalDetails from "../models/UserPersonalDetails.js";
import UserProfile from "../models/UserProfile.js";

class UserPersonalDetailsService {
  async saveDetails(details, mobileNumber) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile not found with mobileNumber: ${mobileNumber}`);

    const saved = await UserPersonalDetails.create({
      ...details,
      userId: user.id,
    });
    return { UserPersonalDetails: saved, status: 200 };
  }

  async getAll(page = 0, size = 10) {
    const offset = page * size;
    const { rows, count } = await UserPersonalDetails.findAndCountAll({
      offset,
      limit: size,
    });

    return {
      UserPersonalDetails: rows,
      totalElements: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      pageSize: size,
      status: rows.length ? 200 : 404,
    };
  }

  async getById(id) {
    const details = await UserPersonalDetails.findByPk(id);
    if (!details)
      return { message: `No details found for ID: ${id}`, status: 404 };
    return { UserPersonalDetails: details, status: 200 };
  }

  async updateDetails(mobileNumber, updatedDetails) {
    const user = await UserProfile.findOne({ where: { mobileNumber } });
    if (!user)
      throw new Error(`Profile not found with mobileNumber: ${mobileNumber}`);

    let details = await UserPersonalDetails.findOne({
      where: { userId: user.id },
    });
    if (!details)
      return {
        message: `No details found for mobileNumber: ${mobileNumber}`,
        status: 404,
      };

    await details.update(updatedDetails);
    return { UserPersonalDetails: details, status: 200 };
  }
}

export default new UserPersonalDetailsService();
