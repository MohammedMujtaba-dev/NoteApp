import express from "express";
import Note from "../Model/note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    // CHECKING IF EMAIL ALREADY EXIST
    const note = await Note.findOne({ title });

    if (note) {
      return res
        .status(200)
        .json({ success: false, message: "Note already existed" });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error in Adding Note" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Cant fetch" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Cant Update" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteNote = await Note.findByIdAndDelete(id, req.body);
    return res.status(200).json({ success: true, DeleteNote });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Cant Delete Note" });
  }
});
export default router;
