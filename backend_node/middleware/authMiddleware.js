const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Extract token

    console.log("🔹 Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded User:", decoded);

        req.user = await User.findById(decoded.id).select("-password"); // Attach user

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, User not found" });
        }

        console.log("✅ User Attached to req:", req.user);
        next();
    } catch (error) {
        console.error("❌ JWT Error:", error.message);
        res.status(401).json({ message: "Unauthorized, Invalid token" });
    }
};
module.exports = protect;