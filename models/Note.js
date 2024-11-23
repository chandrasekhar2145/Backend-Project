const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "Others" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Note", noteSchema);
