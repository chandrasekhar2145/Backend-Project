const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const note = new Note({
      title,
      description,
      category,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Notes
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const notes = await Note.find(filter).sort({ created_at: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Note
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category, is_completed } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, category, is_completed, updated_at: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
