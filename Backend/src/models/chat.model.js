const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chat: [
    {
      role: { type: String, required: true },
      text: { type: String, required: true }
    }
  ]
}, { timestamps: true });

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
