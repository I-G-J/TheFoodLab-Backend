import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Register user
export const registerUser = async (req, res) => {
    const { name, password, email, mobile } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate mobile number format
        if (!validator.isMobilePhone(mobile)) {
            return res.json({ success: false, message: "Please enter a valid mobile number" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (min. 8 characters)" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // userId is added from the authMiddleware
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // Return user data, excluding the password
        res.json({ success: true, user: { name: user.name, email: user.email, mobile: user.mobile } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching profile" });
    }
};