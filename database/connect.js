const mongoose = require("mongoose");
require("dotenv/config");

const mongoURI = process.env.MONGO_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
  }
};

connectToMongoDB();

// Handle SIGINT event to close MongoDB connection
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Connection to MongoDB closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});

module.exports = connectToMongoDB;
