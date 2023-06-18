const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb://root:123456789@localhost:27017/posts?authSource=admin

    const MONGODB_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=${process.env.MONGODB_AUTH_SOURCE}`;

    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("Error connecting to mongoDB: " + err.message);
    throw new Error("Error connecting to mongoDb");
  }
};

module.exports = connectDB;
