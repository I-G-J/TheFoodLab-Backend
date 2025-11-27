import Profile from "../models/profileModel.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const profile = req.profile;

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error("getProfile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const profileId = req.profile?._id;

    if (!profileId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized – no profile found",
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
