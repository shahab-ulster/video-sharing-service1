const { registerUser, loginUser } = require("../services/authService");

const signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!["creator", "consumer"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role. Must be 'creator' or 'consumer'." });
    }

    const user = await registerUser(username, password, role);
    res.status(201).json({ message: "User registered successfully.", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to register user." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await loginUser(username, password);
    res.status(200).json({ message: "Login successful.", user, token });
  } catch (error) {
    res
      .status(401)
      .json({ message: error.message || "Authentication failed." });
  }
};

module.exports = { signup, login };
