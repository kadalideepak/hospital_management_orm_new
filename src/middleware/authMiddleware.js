const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key",
      (err, user) => {
        if (err)
          return res.status(403).json({ message: "Invalid or expired token." });
        req.user = user; // attach user info
        next();
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Token verification failed", error: error.message });
  }
};

module.exports = authenticateToken;
