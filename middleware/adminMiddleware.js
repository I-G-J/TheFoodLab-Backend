import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again." });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user's role is 'admin'
        if (token_decode.role !== "admin") {
            return res.json({ success: false, message: "Forbidden. Admin access required." });
        }

        // If user is an admin, proceed to the next function
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        res.json({ success: false, message: "Error verifying admin token." });
    }
}

export default adminMiddleware;