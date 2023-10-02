const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
