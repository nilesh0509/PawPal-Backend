const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");

router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending message", details: error });
  }
});
router.get("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages", details: error });
  }
});

module.exports = router;
