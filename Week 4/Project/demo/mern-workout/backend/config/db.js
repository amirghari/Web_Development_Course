const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URI =
    "mongodb+srv://ghariamir97:Ag9776Hg0483@cluster0.i8yber4.mongodb.net/?retryWrites=true&w=majority";
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to database`);
};

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI)

//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

module.exports = connectDB;