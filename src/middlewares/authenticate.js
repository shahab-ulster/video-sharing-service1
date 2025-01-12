const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden. Insufficient privileges." });
      }

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
  };
};

module.exports = authenticateUser;
