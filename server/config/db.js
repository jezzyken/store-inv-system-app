const mongoose = require("mongoose");
const initializeAdmin = require('./initAdmin');

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log(`Database connected successfully`);
      await initializeAdmin();
    })
    .catch((err) => {
      console.log(`Unable to connect with the database ${err}`);
    });
};

module.exports = connectDB;