const {
  uploadVideo,
  getVideos,
  addComment,
  addRating,
} = require("../services/videoService");
const { uploadToAzureBlob } = require("../utils/azureBlobStorage");
const fs = require("fs").promises;

const uploadVideoController = async (req, res) => {
  try {
    const { title, description, genre, ageRating } = req.body;
    const uploadedBy = req.user.id;

    const fileBuffer = await fs.readFile(req.file.path);

    const videoUrl = await uploadToAzureBlob(fileBuffer, req.file.originalname);

    const video = await uploadVideo(
      title,
      description,
      genre,
      ageRating,
      videoUrl,
      uploadedBy
    );

    res.status(201).json({ message: "Video uploaded successfully.", video });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Video upload failed.", error: error.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await getVideos();
    res.status(200).json(videos); // 200 for OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 for Internal Server Error
  }
};

const commentOnVideo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const video = await addComment(id, userId, text);
    res.status(200).json({ message: "Comment added successfully.", video }); // 200 for success
  } catch (error) {
    res.status(404).json({ message: error.message }); // 404 for resource not found
  }
};

const rateVideo = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const video = await addRating(id, rating);
    res.status(200).json({ message: "Rating added successfully.", video }); // 200 for success
  } catch (error) {
    res.status(404).json({ message: error.message }); // 404 for not found
  }
};

module.exports = {
  uploadVideoController,
  getAllVideos,
  commentOnVideo,
  rateVideo,
};
