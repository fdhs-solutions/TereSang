import UserFamily from "../models/UserFamily.js";
import UserImage from "../models/UserImage.js"; // optional if you want images
import UserLifeStyle from "../models/UserLifeStyle.js";
import UserPartnerPreferences from "../models/UserPartnerPreferences.js";
import UserPersonalDetails from "../models/UserPersonalDetails.js";
import UserProfile from "../models/UserProfile.js";

export const getAllUserDetails = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const user = await UserProfile.findOne({
      where: { mobileNumber },
      include: [
        { model: UserFamily, as: "userFamilyDetails" },
        { model: UserLifeStyle, as: "userLifeStyleAndEducation" },
        { model: UserPersonalDetails, as: "userPersonalDetails" },
        { model: UserPartnerPreferences, as: "userPartnerPreferences" },
        { model: UserImage, as: "userImages" }, // optional
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const allUserRecord = {
      mobileNumber: user.mobileNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      langKnown: user.langKnown,
      religion: user.religion,
      community: user.community,
      dob: user.dob,
      residence: user.residence,
      mailId: user.userMailId,
      userFamilyDetails: user.userFamilyDetails,
      userLifeStyleAndEducation: user.userLifeStyleAndEducation,
      userPersonalDetails: user.userPersonalDetails,
      userPartnerPreferences: user.userPartnerPreferences,
      userImages: user.userImages || null, // optional
    };

    res.json(allUserRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
