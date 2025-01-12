const mongoose = require("mongoose");
const app = require("./index");
require("dotenv").config();

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_COSMO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("object////", process.env);
  console.log(`Server is running on port ${PORT}`);
});
