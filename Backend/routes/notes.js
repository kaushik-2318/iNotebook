const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes notes using: GET "api/auth/".  Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new Note using: POST "api/auth/addnote".  Login Required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Must have Atleast 3 Character").isLength({ min: 3 }),
    body("description", "Must have Atleast 5 Character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are Error return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update the exsiting Note: Post "api/auth/updatenote".  Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json("No such note found");
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).json("Not Authorized");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Create a newNote object

//ROUTE 4: Delete the exsiting Note: Delete "api/auth/deletenote".  Login Required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be updated and update

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json("No such note found");
    }

    //Allow deletetion only if user owns this notes
    if (note.user.toString() !== req.user.id) {
      res.status(401).json("Not Authorized");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
