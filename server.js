const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const multer = require("multer");
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http')
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed"), false);
  }
};

const upload = multer({
   storage: storage,
   fileFilter: fileFilter, 
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const sliderRoutes = require("./routes/sliderRoutes");
app.use("/api/sliders", sliderRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api/favorites", favoriteRoutes);

const favRoutes = require("./routes/favRoutes")
app.use("/api/favoritess", favRoutes);

const messageRoutes = require("./routes/messageRoutes")
app.use("/api/messages", messageRoutes);

// Socket.io for Real-Time Chat
io.on("connection", (socket) => {
  console.log("⚡ A user connected");

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

const petRoutes = require("./routes/petRoutes");
app.use("/api/pets", petRoutes);

app.use("/api/auth", require("./routes/userRoutes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`PawPal Backend Server Running ${PORT}`.bgMagenta.white));
