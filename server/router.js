const express = require("express");
const router = express.Router();

const MessageModel = require("./models/Message");
const RoomModel = require("./models/Room");
const UserModel = require("./models/User");

/**
 * Running up server
 */
router.get("/", (req, res) => {
  res.send("Server is up and running");
});

/**
 * Getting all rooms
 */
router.get("/room:id", async (req, res) => {
  RoomModel.find({ name: req.params.name }, (err, result) => {
    try {
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });
});

/**
 * Creating new room
 */
router.post("/room", async (req, res) => {
  const message = new RoomModel({
    name: req.body.room,
  });
  try {
    await message.save();
    res.send("Room saved successfully!");
  } catch (err) {
    console.log(err);
  }
});

/**
 * Getting all messages in the specific room
 */
router.get("/messages:room", async (req, res) => {
  MessageModel.find({ room: room }, (err, result) => {
    try {
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });
});

/**
 * Posting a message
 */
router.post("/messages", async (req, res) => {
  const message = new MessageModel({
    text: req.body.text,
    authorId: req.body.authorId,
    time: req.body.time,
  });
  try {
    await message.save();
    res.send("Message saved successfully!");
  } catch (err) {
    console.log(err);
  }
});

/**
 * Adding a new user
 */
router.post("/user", async (req, res) => {
  const user = new UserModel({
    googleId: req.body.googleId,
    name: req.body.name,
  });
  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
