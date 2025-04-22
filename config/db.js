const mongoose = require("mongoose");
const colors = require('colors')
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}` .bgMagenta.white);
  } catch (error) {
    console.error(`Error in Connection DB : ${error.message}` .bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
