const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("🔹 Received Token:", token); // ✅ Check if token is received

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded User:", decoded); // ✅ Check decoded user data

    req.user = decoded; // Ensure `userId` is set
    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message); // Log JWT errors
    res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = protect;
