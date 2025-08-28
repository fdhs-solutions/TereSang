import SearchService from "../services/searchService.js";

class SearchController {
  async add(req, res) {
    try {
      const result = await SearchService.addSearchDetails(req.body);
      res.status(201).json(result);
    } catch (err) {
      res
        .status(400)
        .json({ res: "Data Insertion Failed", error: err.message });
    }
  }

  async get(req, res) {
    try {
      const result = await SearchService.getSearchDetails();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new SearchController();
