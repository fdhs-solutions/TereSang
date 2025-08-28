import SearchDetails from "../models/SearchDetails.js";

class SearchService {
  async addSearchDetails(details) {
    const existing = await SearchDetails.findOne({
      where: {
        motherTongue: details.motherTongue,
        gender: details.gender,
        religion: details.religion,
      },
    });

    if (existing) {
      return {
        res: "Data already exists with the same details",
        details: existing,
      };
    }

    const saved = await SearchDetails.create(details);
    return { res: "Data Inserted Successfully", details: saved };
  }

  async getSearchDetails() {
    const searchDetails = await SearchDetails.findAll();
    if (!searchDetails.length) {
      return { details: "No Data Available" };
    }
    return { details: searchDetails };
  }
}

export default new SearchService();
