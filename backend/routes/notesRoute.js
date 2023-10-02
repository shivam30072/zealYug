const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

router.route("/").post(createNote).get(getAllNotes);
router.route("/:id").patch(updateNote).delete(deleteNote);

module.exports = router;
