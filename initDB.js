const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb://root:123456789@localhost:27017/posts?authSource=admin

    console.log("environment variables", process.env);

    const MONGODB_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=${process.env.MONGODB_AUTH_SOURCE}`;

    console.log("MONGODB_URL", MONGODB_URL);

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

// const mongoose = require('mongoose');

// module.exports = () => {

//   const MONGODB_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=${process.env.MONGODB_AUTH_SOURCE}`

//   console.log('environment variables', process.env);
//   console.log('mongodb_uri', MONGODB_URI);

//   mongoose
//     .connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     })
//     .then(() => {
//       console.log('Mongodb connected....');
//     })
//     .catch(err => console.log(err));

//   mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to db...');
//   });

//   mongoose.connection.on('error', err => {
//     console.log(err.message);
//   });

//   mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose connection is disconnected...');
//   });

//   process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//       console.log(
//         'Mongoose connection is disconnected due to app termination...'
//       );
//       process.exit(0);
//     });
//   });
// };
