const adminOnly = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        console.log("🔹 Received Token:", token);

        if (!token) {
            console.log("❌ No token provided!");
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Userasdasd:", decoded);
        console.log("sadasd");

        // Fetch user from DB
        const user = await user.findById(decoded.id).select("-password");
        console.log("something",user);

        if (!user) {
            console.log("❌ User not found in DB for ID:", decoded.id);
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        console.log("✅ User Found:", user);

        // Debug `isAdmin`
        console.log("🔍 Checking Admin User ID:", user._id);
        console.log("🔍 Checking isAdmin Value:", user.isAdmin, `Type: ${typeof user.isAdmin}`);

        if (!user.isAdmin) {
            console.log("❌ Access Denied: User is not an admin!");
            return res.status(403).json({ message: "Access denied. Not an admin!" });
        }

        req.user = user;
        console.log("✅ Admin Verified:", user._id);

        next();
    } catch (error) {
        console.error("❌ JWT Error:", error.message);
        res.status(500).json({ message: "Server error." });
    }
};
