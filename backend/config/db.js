const mongoose = require("mongoose");
const colors = require("colors");

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("====================================");
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    console.log("====================================");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
