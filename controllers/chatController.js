const Chat = require("../models/chatModel.js");
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const chatMessage = new Chat({ senderId, receiverId, message });
    await chatMessage.save();

    res.status(201).json({ success: true, chatMessage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender and Receiver ID required" });
    }

    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessages };
