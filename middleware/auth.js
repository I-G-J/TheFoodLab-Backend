import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again." });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // We add the userId to the request body so the next function can use it
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying token." });
    }
}

export default authMiddleware;