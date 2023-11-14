const mongoose = require("mongoose");

/**
 * Danabase schema for users
 */
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
