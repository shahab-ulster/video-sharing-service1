const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    ageRating: {
      type: String,
      required: [true, "Age rating is required"],
      enum: ["G", "PG", "PG-13", "R", "NC-17", "18+"],
    },
    url: {
      type: String,
      required: [true, "Video URL is required"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Only creators can upload
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ratings: [
      {
        type: Number,
        min: 1,
        max: 5, // Ratings are on a scale of 1 to 5
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

VideoSchema.pre(/^find/, function (next) {
  this.populate({
    path: "uploadedBy",
    select: "username role", // Populate only necessary fields
  }).populate({
    path: "comments.user",
    select: "username",
  });
  next();
});

module.exports = mongoose.model("Video", VideoSchema);
