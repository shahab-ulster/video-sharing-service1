const Video = require("../models/Video");

// upload a video
const uploadVideo = async (
  title,
  description,
  genre,
  ageRating,
  url,
  uploadedBy
) => {
  const video = new Video({
    title,
    description,
    genre,
    ageRating,
    url,
    uploadedBy,
  });
  await video.save();
  return video;
};

const getVideos = async () => {
  return await Video.find().populate("uploadedBy", "username role");
};

const addComment = async (videoId, userId, text) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found.");
  }

  video.comments.push({ user: userId, text });
  await video.save();
  return video;
};

const addRating = async (videoId, rating) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found.");
  }

  video.ratings.push(rating);
  await video.save();
  return video;
};

module.exports = { uploadVideo, getVideos, addComment, addRating };
