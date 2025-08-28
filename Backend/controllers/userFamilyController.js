import UserFamilyDetails from "../models/UserFamilyDetails.js";

// GET /user-family-details?page=0&size=10
export const getAllUserFamilyDetails = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const offset = page * size;

    const { count, rows } = await UserFamilyDetails.findAndCountAll({
      limit: size,
      offset,
    });

    res.json({
      success: true,
      total: count,
      page,
      size,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

// GET /user-family-details/:id
export const getUserFamilyDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const details = await UserFamilyDetails.findByPk(id);

    if (!details) {
      return res.status(404).json({ error: "User family details not found" });
    }

    res.json({ success: true, data: details });
  } catch (err) {
    next(err);
  }
};

// POST /save-user-family-details?mobileNumber=xxxx
export const saveUserFamilyDetails = async (req, res, next) => {
  try {
    const mobileNumber = req.query.mobileNumber;
    const body = req.body;

    const existing = await UserFamilyDetails.findOne({
      where: { mobileNumber },
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Details for this mobile number already exist" });
    }

    const created = await UserFamilyDetails.create({ ...body, mobileNumber });

    res.status(201).json({
      success: true,
      message: "User family details saved successfully",
      data: created,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /update-user-family-details/:mobileNumber
export const updateUserFamilyDetails = async (req, res, next) => {
  try {
    const mobileNumber = req.params.mobileNumber;
    const body = req.body;

    const details = await UserFamilyDetails.findOne({
      where: { mobileNumber },
    });
    if (!details) {
      return res.status(404).json({ error: "User family details not found" });
    }

    await details.update(body);

    res.json({
      success: true,
      message: "User family details updated successfully",
      data: details,
    });
  } catch (err) {
    next(err);
  }
};
