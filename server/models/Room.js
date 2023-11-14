const mongoose = require("mongoose");

/**
 * Danabase schema for room
 */
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: {
    type: [],
    required: false,
  },
});

const room = mongoose.model("Room", RoomSchema);
module.exports = room;
