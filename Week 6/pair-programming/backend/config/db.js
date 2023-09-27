const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://sadon:at8inG5dtAkdDmPV@cluster0.jzzuiir.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  mongoose.set('strictQuery', false); // Add this line to suppress the warning
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`Connected to the database`);
}

module.exports = connectDB;
