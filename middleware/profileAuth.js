import jwt from "jsonwebtoken";
import Profile from "../models/profileModel.js";

const profileAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    req.profile = profile;
    next();
  } catch (error) {
    console.error("profileAuth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized token" });
  }
};

export default profileAuth;
