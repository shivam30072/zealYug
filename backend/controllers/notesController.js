const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const createNote = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    res.status(400).json({ message: "Both fields are required" });
    throw new Error("Data not Provided");
  }

  const note = await Note.create({ title, desc });
  if (note) {
    return res
      .status(200)
      .json({ note, message: "Note Submitted Successfully" });
  }
  res.status(400).json({ message: "Server Error" });
});

const getAllNotes = asyncHandler(async (req, res) => {
  const allNotes = await Note.find({});
  res.status(200).json({ allNotes, count: allNotes.length });
});

const updateNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { title, desc } = req.body;

  if (!noteId) {
    res.status(400).json({ message: "Params not found error" });
    throw new Error("Params not found error");
  }

  if (!title || !desc) {
    res.status(400).json({ message: "Title not Provided" });
    throw new Error("Title not Provided");
  }

  const updatedNote = await Note.findByIdAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });
  if (updatedNote) {
    res.status(200).json({ updatedNote, message: "Note updated successfully" });
  } else {
    res.status(404).json({ message: "Note does not exist" });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "Params not found error" });
  }

  const deletedNote = await Note.findByIdAndDelete({
    _id: noteId,
  });
  if (deletedNote) {
    return res.status(200).json({ message: "Note deleted successfully" });
  }
  res.status(404).json({ message: "Note does not exist" });
});

module.exports = { createNote, getAllNotes, updateNote, deleteNote };
