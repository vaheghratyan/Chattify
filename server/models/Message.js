const mongoose = require("mongoose");

/**
 * Danabase schema for messages
 */
const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const message = mongoose.model("Message", MessageSchema);

module.exports = message;
