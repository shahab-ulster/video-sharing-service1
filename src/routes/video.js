const express = require("express");
const {
  uploadVideoController,
  getAllVideos,
  commentOnVideo,
  rateVideo,
} = require("../controllers/videoController");
const authenticateUser = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");

const router = express.Router();

// Route to upload a video (creator only)
router.post(
  "/upload",
  authenticateUser("creator"),
  upload.single("video"),
  uploadVideoController
);
router.get("/", getAllVideos);
router.post("/:id/comment", authenticateUser("consumer"), commentOnVideo);
router.post("/:id/rate", authenticateUser("consumer"), rateVideo);

module.exports = router;
